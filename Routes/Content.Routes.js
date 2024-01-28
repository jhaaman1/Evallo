import { ContentService } from "../Services/ContentService.js";
import { Authorize } from "../middlewares/Auth.js";

export const ContentRoutes = (app) => {
  app.post("/api/submit", Authorize(["teacher"]), async (req, res) => {
    try {
      const newContent = await ContentService.createContents(req.body);
      res.json(newContent);
      newContent.save();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/allContent", Authorize(["teacher"]), async (req, res) => {
    try {
      const allContents = await ContentService.getAllContents();
      res.json(allContents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/:contentId", Authorize(["teacher"]), async (req, res) => {
    try {
      const content = await ContentService.getContentById(req.params.contentId);
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  // Delete content by ID
  app.delete("/api/delete/:contentId", Authorize(["teacher"]), async (req, res) => {
    try {
      const deletedContent = await ContentService.deleteContentById(
        req.params.contentId
      );

      if (deletedContent) {
        res.json({ message: "Content deleted successfully" });
      } else {
        res.status(404).json({ error: "Content not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update content by ID
  app.put("/api/edit/:contentId", Authorize(["teacher"]), async (req, res) => {
    // Check for validation errors

    try {
      const updatedContent = await ContentService.updateContentById(
        req.params.contentId,
        req.body
      );

      if (updatedContent) {
        res.json({ message: "Content updated successfully", updatedContent });
      } else {
        res.status(404).json({ error: "Content not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
