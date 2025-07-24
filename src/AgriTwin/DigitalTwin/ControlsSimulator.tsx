import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward,
  Calendar,
  Cloud
} from 'lucide-react';

interface AgriFarmControlsProps {
  isPlaying: boolean;
  simulationSpeed: number;
  selectedSeason: string;
  weatherCondition: string;
  onPlayPause: () => void;
  onReset: () => void;
  onSpeedChange: (value: number[]) => void;
  onSeasonChange: (value: string) => void;
  onWeatherChange: (value: string) => void;
}

export default function ControlsSimulator({
  isPlaying,
  simulationSpeed,
  selectedSeason,
  weatherCondition,
  onPlayPause,
  onReset,
  onSpeedChange,
  onSeasonChange,
  onWeatherChange
}: AgriFarmControlsProps) {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onPlayPause}
            className="hover:bg-green-100 dark:hover:bg-blue-900"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            className="hover:bg-green-100 dark:hover:bg-blue-900"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-green-600 dark:text-blue-400" />
            <Select value={selectedSeason} onValueChange={onSeasonChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring">Spring</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="fall">Fall</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Cloud className="h-4 w-4 text-green-600 dark:text-blue-400" />
            <Select value={weatherCondition} onValueChange={onWeatherChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Weather" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunny">Sunny</SelectItem>
                <SelectItem value="cloudy">Cloudy</SelectItem>
                <SelectItem value="rainy">Rainy</SelectItem>
                <SelectItem value="stormy">Stormy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <FastForward className="h-4 w-4 text-green-600 dark:text-blue-400" />
          <Slider
            defaultValue={[simulationSpeed]}
            max={5}
            min={1}
            step={1}
            onValueChange={onSpeedChange}
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
}