const { curatedList } = require("../models");

const createCuratedList = async (req, res) => {
  try {
    const { name, description, slug } = req.body;
    if (!name || !description || !slug) {
      return res
        .status(400)
        .json({ message: "Name, description, and slug are required fields." });
    }
    await curatedList.create({ name, description, slug });
    return res
      .status(201)
      .json({ message: "'Curated list created successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating Curated list", message: err.message });
  }
};
