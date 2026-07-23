import mongoose from "mongoose";
import User from "../models/User";
import Team from "../models/Team";
import Activity from "../models/Activity";
import Leaderboard from "../models/Leaderboard";
import Workout from "../models/Workout";

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/octofit_db";

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log("Connected to octofit_db");

    // Clear existing data so the seed script can be run repeatedly
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    // Users - Mergington High School students
    const users = await User.insertMany([
      { name: "Ava Martinez", email: "ava.martinez@mergington.edu", age: 16 },
      { name: "Liam Chen", email: "liam.chen@mergington.edu", age: 17 },
      { name: "Sofia Patel", email: "sofia.patel@mergington.edu", age: 15 },
      { name: "Noah Johnson", email: "noah.johnson@mergington.edu", age: 16 },
      { name: "Maya Thompson", email: "maya.thompson@mergington.edu", age: 17 },
      {
        name: "Ethan Rodriguez",
        email: "ethan.rodriguez@mergington.edu",
        age: 15,
      },
    ]);

    // Teams
    const teams = await Team.insertMany([
      { name: "Falcons", members: [users[0]._id, users[1]._id, users[2]._id] },
      { name: "Titans", members: [users[3]._id, users[4]._id, users[5]._id] },
    ]);

    await User.findByIdAndUpdate(users[0]._id, { team: teams[0]._id });
    await User.findByIdAndUpdate(users[1]._id, { team: teams[0]._id });
    await User.findByIdAndUpdate(users[2]._id, { team: teams[0]._id });
    await User.findByIdAndUpdate(users[3]._id, { team: teams[1]._id });
    await User.findByIdAndUpdate(users[4]._id, { team: teams[1]._id });
    await User.findByIdAndUpdate(users[5]._id, { team: teams[1]._id });

    // Activities
    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        type: "Running",
        durationMinutes: 30,
        caloriesBurned: 300,
      },
      {
        user: users[1]._id,
        type: "Walking",
        durationMinutes: 45,
        caloriesBurned: 200,
      },
      {
        user: users[2]._id,
        type: "Strength Training",
        durationMinutes: 40,
        caloriesBurned: 250,
      },
      {
        user: users[3]._id,
        type: "Cycling",
        durationMinutes: 60,
        caloriesBurned: 450,
      },
      {
        user: users[4]._id,
        type: "Swimming",
        durationMinutes: 30,
        caloriesBurned: 320,
      },
      {
        user: users[5]._id,
        type: "Running",
        durationMinutes: 25,
        caloriesBurned: 270,
      },
      {
        user: users[0]._id,
        type: "Yoga",
        durationMinutes: 20,
        caloriesBurned: 90,
      },
      {
        user: users[3]._id,
        type: "Strength Training",
        durationMinutes: 35,
        caloriesBurned: 220,
      },
    ]);

    // Leaderboard
    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 480, rank: 1 },
      { user: users[3]._id, team: teams[1]._id, points: 460, rank: 2 },
      { user: users[4]._id, team: teams[1]._id, points: 320, rank: 3 },
      { user: users[2]._id, team: teams[0]._id, points: 250, rank: 4 },
      { user: users[5]._id, team: teams[1]._id, points: 270, rank: 5 },
      { user: users[1]._id, team: teams[0]._id, points: 200, rank: 6 },
    ]);

    // Workouts
    await Workout.insertMany([
      {
        name: "Beginner Cardio Blast",
        description:
          "20-minute walk/jog interval routine for building endurance.",
        difficulty: "beginner",
        suggestedFor: [users[1]._id, users[2]._id],
      },
      {
        name: "Full-Body Strength Circuit",
        description:
          "Bodyweight squats, push-ups, and planks in a 3-round circuit.",
        difficulty: "intermediate",
        suggestedFor: [users[2]._id, users[5]._id],
      },
      {
        name: "Advanced HIIT Sprint Session",
        description:
          "High-intensity sprint intervals with short recovery periods.",
        difficulty: "advanced",
        suggestedFor: [users[0]._id, users[3]._id],
      },
      {
        name: "Recovery Yoga Flow",
        description:
          "Gentle stretching and breathing exercises for active recovery.",
        difficulty: "beginner",
        suggestedFor: [users[4]._id],
      },
    ]);

    console.log(`Seeded ${users.length} users`);
    console.log(`Seeded ${teams.length} teams`);
    console.log(`Seeded ${activities.length} activities`);
    console.log("Seeded leaderboard entries");
    console.log("Seeded workouts");
    console.log("Database seeding complete");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
