
import { GoogleGenAI } from "@google/genai";
import { GameState, ShotPlacement, Timing, BallType } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Commentary will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateCommentary = async (
    gameState: GameState,
    placement: ShotPlacement,
    timing: Timing,
    ball: BallType,
    outcome: string,
    battingTeamName: string
): Promise<string> => {
    if(!API_KEY) {
        return `The bowler delivers a ${ball.toLowerCase()} ball. The shot is played to the ${placement.toLowerCase()}. Outcome: ${outcome}.`;
    }

  const prompt = `
    You are an expert, passionate, and slightly dramatic cricket commentator.
    Generate a single, exciting commentary line (max 25 words) for a T20 cricket match.
    Do not use markdown.

    Match Situation:
    - Batting Team: ${battingTeamName}
    - Score: ${gameState.score}/${gameState.wickets}
    - Overs: ${gameState.overs}.${gameState.balls}
    - Chasing Target: ${gameState.target || 'Not set'}

    Last Ball Event:
    - Bowler's delivery: ${ball}
    - Batsman's shot placement: ${placement}
    - Batsman's timing: ${timing}
    - Outcome: ${outcome}

    Commentate on this specific event with excitement and flair, focusing on the timing and placement. For example, a "perfect" timed shot is a beautiful stroke. An "early" or "late" shot is a mishit.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating commentary:", error);
    return `An exciting moment in the match as ${battingTeamName} faces a ${ball.toLowerCase()}! The outcome: ${outcome}.`;
  }
};