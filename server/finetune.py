import os
import json
from typing import Dict, Any
import pandas as pd

class ModelTrainer:
    def _init_(self, model_name: str, dataset_path: str):
        self.model_name = model_name
        self.dataset_path = dataset_path
        
    def prepare_training_data(self) -> list:
        """Convert CSV data into training format."""
        df = pd.read_csv(self.dataset_path)
        training_data = []
        
        for _, row in df.iterrows():
            training_example = {
                "prompt": f"Analyze this food sample: {row['text']}\n",
                "completion": f"Classification: {row['label']}"
            }
            training_data.append(training_example)
            
        return training_data
    
    def create_modelfile(self, config: Dict[Any, Any]) -> str:
        """Create a Modelfile with training configuration."""
        modelfile_content = f"""
FROM {self.model_name}

# Training parameters
PARAMETER learning_rate {config['learning_rate']}
PARAMETER num_epochs {config['epochs']}
PARAMETER batch_size {config['batch_size']}

# System prompt for food adulteration detection
SYSTEM You are an AI trained to detect and analyze food adulteration.
"""
        
        with open("Modelfile", "w") as f:
            f.write(modelfile_content)
            
        return "Modelfile"

    def train(self, config: Dict[Any, Any]) -> str:
        """Prepare and initiate training process."""
        # Prepare training data
        training_data = self.prepare_training_data()
        
        # Save training data
        with open("training_data.jsonl", "w") as f:
            for example in training_data:
                f.write(json.dumps(example) + "\n")
        
        modelfile_path = self.create_modelfile(config)
        
        new_model_name = f"{self.model_name}-food-detector"
        
        commands = [
            f"ollama create {new_model_name} -f {modelfile_path}",
            f"ollama train {new_model_name} training_data.jsonl"
        ]
        
        print("Execute the following commands in your terminal:")
        for cmd in commands:
            print(cmd)
            
        return new_model_name

if _name_ == "_main_":
    config = {
        "learning_rate": 2e-5,
        "epochs": 3,
        "batch_size": 8,
        "validation_split": 0.1
    }
    
    trainer = ModelTrainer(
        model_name="llama2",
        dataset_path="food_adulteration_data.csv"
    )
    
    new_model_name = trainer.train(config)
    print(f"New model will be created as: {new_model_name}")