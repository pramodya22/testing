// Server-side model service for handling predictions
export interface ModelPrediction {
  diagnosis: string;
  confidence: number;
  severity: 'low' | 'moderate' | 'high' | null;
  isHealthy: boolean;
  description: string;
  treatment: string;
}

class ServerModelService {
  private readonly diseaseClasses = [
    'Aloe Rust',
    'Anthracnose', 
    'Healthy',
    'Leaf Spot',
    'Sunburn'
  ];

  private readonly diseaseInfo = {
    'Healthy': {
      description: 'Your Aloe Vera plant appears healthy with no visible signs of disease.',
      treatment: 'Continue your current care routine. Maintain proper watering and lighting.',
      severity: null as null
    },
    'Leaf Spot': {
      description: 'Fungal infection causing circular brown or black spots on leaves.',
      treatment: 'Remove affected leaves, improve air circulation, apply fungicide, reduce watering frequency.',
      severity: 'moderate' as const
    },
    'Aloe Rust': {
      description: 'Fungal disease causing orange-brown pustules on leaf surfaces.',
      treatment: 'Remove infected parts, ensure good ventilation, apply copper-based fungicide.',
      severity: 'high' as const
    },
    'Anthracnose': {
      description: 'Fungal disease causing dark, sunken lesions on leaves and stems.',
      treatment: 'Prune affected areas, improve drainage, apply systemic fungicide treatment.',
      severity: 'high' as const
    },
    'Sunburn': {
      description: 'Damage from excessive direct sunlight causing brown or white patches.',
      treatment: 'Move to partial shade, gradually reintroduce to sunlight, remove damaged parts.',
      severity: 'low' as const
    }
  };

  async predictFromImageName(imageName: string): Promise<ModelPrediction> {
    // For now, simulate model prediction
    // In production, you would load and run the actual Keras model here
    const diseases = Object.keys(this.diseaseInfo);
    const randomIndex = Math.floor(Math.random() * diseases.length);
    const predictedDisease = diseases[randomIndex] as keyof typeof this.diseaseInfo;
    const confidence = 0.75 + Math.random() * 0.24; // Random confidence between 75-99%

    const diseaseData = this.diseaseInfo[predictedDisease];
    
    return {
      diagnosis: predictedDisease,
      confidence: Math.round(confidence * 100) / 100,
      severity: diseaseData.severity,
      isHealthy: predictedDisease === 'Healthy',
      description: diseaseData.description,
      treatment: diseaseData.treatment
    };
  }
}

export const modelService = new ServerModelService();