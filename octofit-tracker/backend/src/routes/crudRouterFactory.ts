import { Router } from "express";
import type { Model } from "mongoose";

/**
 * Builds a basic CRUD router (list, get by id, create, update, delete)
 * backed by the given Mongoose model.
 */
export function createCrudRouter(model: Model<any>): Router {
  const router = Router();

  router.get("/", async (_req, res) => {
    try {
      const docs = await model.find();
      res.json(docs);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const doc = await model.findById(req.params.id);
      if (!doc) {
        return res.status(404).json({ error: "Not found" });
      }
      res.json(doc);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const doc = await model.create(req.body);
      res.status(201).json(doc);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        return res.status(404).json({ error: "Not found" });
      }
      res.json(doc);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const doc = await model.findByIdAndDelete(req.params.id);
      if (!doc) {
        return res.status(404).json({ error: "Not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  return router;
}
