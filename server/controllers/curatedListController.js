const { CuratedList } = require("../models");

const createCuratedList = async (req, res) => {
  try {
    const { name, description, slug } = req.body;
    if (!name || !description || !slug) {
      return res
        .status(400)
        .json({ message: "Name, description, and slug are required fields." });
    }
    await CuratedList.create({ name, description, slug });
    return res
      .status(201)
      .json({ message: "Curated list created successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating Curated list", message: err.message });
  }
};

const updateCuratedList = async (req, res) => {
  try {
    const curatedListId = req.params.curatedListId;
    if (!curatedListId) {
      return res.status(400).json({ message: "curated list id required" });
    }
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are require fields." });
    }
    const curatedList = await CuratedList.findByPk(curatedListId);
    if (curatedList === null) {
      return res
        .status(404)
        .json({ message: `curatedList not found by this id ${curatedListId}` });
    }
    const slug = name.replace(/\s+/g, "-").toLowerCase();
    curatedList.name = name;
    curatedList.description = description;
    curatedList.slug = slug;
    await curatedList.save();
    return res
      .status(200)
      .json({ message: "Curated list updated successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Error updating Curated list" });
  }
};

module.exports = { createCuratedList, updateCuratedList };
