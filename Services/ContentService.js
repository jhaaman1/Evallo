import { Content } from "../models/ContentModel.js";

export const ContentService = {
  createContents: async (data) => {
    try {
      const content = new Content(data);
      return await content.save();
    } catch (error) {
      throw error;
    }
  },

  getAllContents: async () => {
    try {
      const allContents = await Content.find();

      return allContents;
    } catch (error) {
      throw error;
    }
  },

  getContentById: async (data) => {
    try {
      return await Content.findById(data);
    } catch (error) {
      throw error;
    }
  },

  deleteContentById: async (contentId) => {
    try {
      // Use the Content model to find the content by its ID and remove it
      const deletedContent = await Content.findByIdAndDelete(contentId);

      return deletedContent;
    } catch (error) {
      throw error;
    }
  },
  updateContentById: async (contentId, updatedData) => {
    try {
      // Use the Content model to find the content by its ID and update it
      const updatedContent = await Content.findByIdAndUpdate(
        contentId,
        { $set: updatedData },
        { new: true }
      );

      return updatedContent;
    } catch (error) {
      throw error;
    }
  },
};
