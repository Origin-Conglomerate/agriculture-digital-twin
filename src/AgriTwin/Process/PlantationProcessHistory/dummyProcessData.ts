import landPrep1 from "@/assets/PlantationProcessHistory/week1-land-prep.jpg";
import landPrep2 from "@/assets/PlantationProcessHistory/week2-rotovator.jpg";
import fertilizerApp from "@/assets/PlantationProcessHistory/week3-fertilizer.jpg";
import transplanting from "@/assets/PlantationProcessHistory/week4-transplanting.jpg";
import fertigation from "@/assets/PlantationProcessHistory/week5-fertigation.jpg";
import intercrop from "@/assets/PlantationProcessHistory/week7-intercrop.jpg";
import intercropvideo from "@/assets/PlantationProcessHistory/intercrop-video.mp4";

export interface Media {
  sasUrl: string;
  fileName: string;
  blobName: string;
}

export interface ProcessData {
  _id: string;
  title: string;
  instruction: string;
}

export interface ProcessLog {
  _id: string;
  processLog: string;
  media: Media[];
}

export const DUMMY_PROJECT_START_DATE = '2024-09-01';
export const TOTAL_WEEKS = 7;

export const generateDummyProcessData = (week: number): ProcessData[] => {
  const processData: { [key: number]: ProcessData[] } = {
    1: [{
      _id: 'process-1-1',
      title: 'Land Preparation',
      instruction: 'Use a JCB or tractor to prepare the land for the pipeline and other infrastructure like walkways, roads, and fences. Install the pipeline according to the design, and please share the design diagram for future reference.'
    }],
    2: [{
      _id: 'process-2-1',
      title: 'Land Preparation',
      instruction: 'Use rotovator to break the clod and bring the soil to a fine tilt. At a depth of 1/4 feet. "After using the rotavator, there should be no gap for mulching."'
    }],
    3: [{
      _id: 'process-3-1',
      title: 'Fertilizer Application',
      instruction: 'For 1 acre, the basal dose includes: 150 kg of city compost: This compost is rich in nutrients and helps improve soil quality. 50 kg of neem cake: It helps prevent diseases and insects naturally. 100 kg of 15:15:15 NPK : This is a balanced fertilizer that provides the main nutrients (Nitrogen, Phosphorus, Potassium) for the plant\'s early growth. 5 kg of zinc sulphate: A micronutrient that supports root development and overall plant health. 10 kg of magnesium sulphate: Another micronutrient that aids in leef differention to develop lush green color. This combination should be given 200 g per/plant.'
    }],
    4: [{
      _id: 'process-4-1',
      title: 'Trans-planting',
      instruction: 'When planting banana using tissue culture, the plants are placed at a depth of ½ foot (0.5 feet) in the soil. This method helps the young plants establish strong roots and grow properly. Root zone should be provided with basal irrigation.'
    }],
    5: [{
      _id: 'process-5-1',
      title: 'Fertigation',
      instruction: 'To promote the growth of the root humic acid is given to the plant with the ratio of 12:61:00.'
    }],
    6: [{
      _id: 'process-6-1',
      title: 'Gap Filling',
      instruction: 'When a plant dies, it\'s important to replace it with a healthy one. It is one of the major part.'
    }],
    7: [{
      _id: 'process-7-1',
      title: 'Intercrops',
      instruction: 'The seed should be given to the nursery, where they will take 15 days to grow it into a seedling.'
    }]
  };

  return processData[week] || [];
};

export const generateDummyProcessLogData = (processId: string, week: number): ProcessLog | null => {
  const logData: { [key: string]: ProcessLog } = {
    'process-1-1': {
      _id: 'log-process-1-1',
      processLog: 'Used a JCB or tractor to get the land ready for the pipeline. Completed the pipeline installation according to the approved design and shared the line diagram in the designated folder.',
      media: [{
        sasUrl: landPrep1,
        fileName: 'week1-land-preparation.jpg',
        blobName: 'media-blob-week1-1'
      }]
    },
    'process-2-1': {
      _id: 'log-process-2-1',
      processLog: 'As per above instruction used rotovator to break the clod and bring the soil to a fine tilt, digging down to a depth down to a depth of 1.75 feet. After using rotovator mulching work is started immediatly.',
      media: [{
        sasUrl: landPrep2,
        fileName: 'week2-rotovator.jpg',
        blobName: 'media-blob-week2-1'
      }]
    },
    'process-3-1': {
      _id: 'log-process-3-1',
      processLog: 'As per above instructions applied basal dose.',
      media: [{
        sasUrl: fertilizerApp,
        fileName: 'week3-fertilizer-application.jpg',
        blobName: 'media-blob-week3-1'
      }]
    },
    'process-4-1': {
      _id: 'log-process-4-1',
      processLog: 'As per the instruction the banana plantation is done and root zone has been provided with basal irrigation.',
      media: [{
        sasUrl: transplanting,
        fileName: 'week4-transplanting.jpg',
        blobName: 'media-blob-week4-1'
      }]
    },
    'process-5-1': {
      _id: 'log-process-5-1',
      processLog: 'To promote the growth of the roots, humic acid with a ratio of 12:61:00 has been applied to the plant. This helps improve nutrient absorption and stimulates stronger root development.',
      media: []
    },
    'process-6-1': {
      _id: 'log-process-6-1',
      processLog: 'This work has been done by removing the dead plant and planting a new, healthy one in its place to ensure continued growth and productivity in the field or garden.',
      media: []
    },
    'process-7-1': {
      _id: 'log-process-7-1',
      processLog: 'The seed has been given to the nursery, where it has been carefully nurtured and grown into a seedling over the course of 15 days.',
      media: [{
        sasUrl: intercrop,
        fileName: 'week7-intercrop.jpg',
        blobName: 'media-blob-week7-1'
      }]
    }
  };

  return logData[processId] || null;
};
