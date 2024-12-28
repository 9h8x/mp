import cron from "node-cron";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const tasks = [
  // INSTAGRAM
  {
    savePath: "./pricing/instagram/followers/not-guaranteed.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Instagram%20Followers%20[Not%20Guaranteed]&sort=lp",
  },
  {
    savePath: "./pricing/instagram/followers/guaranteed.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Instagram%20Followers%20[Guaranteed]&sort=lp",
  },
  {
    savePath: "./pricing/instagram/likes/real.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Instagram%20Likes&sort=lp",
  },
  {
    savePath: "./pricing/instagram/likes/bots.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Instagram%20Likes%20[BOTS]&sort=lp",
  },
  {
    savePath: "./pricing/instagram/views/views.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Instagram%20Views&sort=lp",
  },
  // TIKTOK
  {
    savePath: "./pricing/tiktok/views/views.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Tiktok%20Views&sort=lp",
  },
  {
    savePath: "./pricing/tiktok/followers/followers.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Tiktok%20Followers&sort=lp",
  },
  {
    savePath: "./pricing/tiktok/likes/likes.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Tiktok%20Likes&sort=lp",
  },
  // YOUTUBE
  {
    savePath: "./pricing/youtube/subscribers/subscribers.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Youtube%20Subscribers&sort=lp",
  },
  {
    savePath: "./pricing/youtube/likes/likes.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Youtube%20Likes%20/%20Dislikes%20/%20Shares&sort=lp",
  },
  {
    savePath: "./pricing/youtube/views/high-retention.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Youtube%20Views%20[High%20Retention]&sort=lp",
  },
  {
    savePath: "./pricing/youtube/views/views.json",
    url: "http://localhost:4321/api/jap/serviceList?category=Youtube%20Views&sort=lp",
  },
  // Add more tasks here as needed
];

const fetchDataAndSave = async (task) => {
  console.log(`Running scheduled task for ${task.savePath}`);

  try {
    const response = await fetch(task.url);
    const data = await response.json();

    if (data.length > 0) {
      const firstResult = data[0];
      const resultWithTime = {
        "ran time": new Date().toISOString(),
        ...firstResult,
      };

      const filePath = path.resolve(task.savePath);
      const dir = path.dirname(filePath);

      // Ensure the directory exists
      fs.mkdirSync(dir, { recursive: true });

      fs.writeFileSync(filePath, JSON.stringify(resultWithTime, null, 2));
      console.log(`Data saved to ${task.savePath}`);
    } else {
      console.log(`No data for ${task.url}`);
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

// Run the tasks at startup
tasks.forEach(fetchDataAndSave);

// Define the task to run every 5 minutes
cron.schedule("*/5 * * * *", () => {
  tasks.forEach(fetchDataAndSave);
});

console.log("Scheduler started");
