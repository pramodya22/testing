import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { modelService } from "./modelService";
import { signinSchema, signupSchema, insertPlantAnalysisSchema, insertDiseaseReportSchema, insertUserFeedbackSchema } from "@shared/schema";

// Extend session interface
declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { username, password } = signinSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Store user in session (simplified)
      req.session.userId = user.id;
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { confirmPassword, ...userData } = signupSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser(userData);
      req.session.userId = user.id;
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.post("/api/auth/signout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Signed out successfully" });
    });
  });

  app.get("/api/auth/user", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ ...user, password: undefined });
  });

  // Plant analysis routes
  app.post("/api/analyses", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const analysisData = insertPlantAnalysisSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });

      const analysis = await storage.createPlantAnalysis({
        ...analysisData,
      });

      res.json(analysis);
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.get("/api/analyses", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const analyses = await storage.getPlantAnalysesByUser(req.session.userId);
    res.json(analyses);
  });

  app.get("/api/analyses/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const analysis = await storage.getPlantAnalysisById(parseInt(req.params.id));
    if (!analysis || analysis.userId !== req.session.userId) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    res.json(analysis);
  });

  // Model analysis endpoint for real-time predictions
  app.post("/api/analyze-image", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const { imageName } = req.body;
      
      // Use the model service for prediction
      const prediction = await modelService.predictFromImageName(imageName);
      
      res.json(prediction);
    } catch (error) {
      console.error('Model prediction error:', error);
      res.status(500).json({ message: "Analysis failed" });
    }
  });

  // Disease reporting routes
  app.post("/api/disease-reports", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const reportData = insertDiseaseReportSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });

      const report = await storage.createDiseaseReport(reportData);
      res.json(report);
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.get("/api/disease-reports", async (req, res) => {
    const reports = await storage.getDiseaseReports();
    res.json(reports);
  });

  // User feedback routes
  app.post("/api/feedback", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const feedbackData = insertUserFeedbackSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });

      const feedback = await storage.createUserFeedback(feedbackData);
      res.json(feedback);
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Statistics route
  app.get("/api/stats", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const analyses = await storage.getPlantAnalysesByUser(req.session.userId);
    const healthyCount = analyses.filter(a => a.isHealthy).length;
    const diseasedCount = analyses.length - healthyCount;

    res.json({
      totalAnalyzed: analyses.length,
      healthyPlants: healthyCount,
      diseasesDetected: diseasedCount,
      daysActive: 15, // Mock data
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}