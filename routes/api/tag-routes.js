const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
      { model: Product,
        through: ProductTag} ]
  })
  .then(dbTagData => {
    res.json(dbTagData)
  })
  .catch(err => {
    res.status(400).json(err);
  })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      { model: Product,
        through: ProductTag} 
    ]
  })
  .then(dbTagData => {
    res.json(dbTagData)
  })
  .catch(err => {
    res.status(400).json(err);
  })
  // be sure to include its associated Product data
});


router.post('/', async (req, res) => {

  // create a new tag -- using async/await syntax to try it out.
 try {
  const tag = await Tag.create(req.body)
    res.json(tag)
  
 } catch (err) {
  res.status(400).json(err)
 } 
  
});

router.put('/:id', (req, res) => {
  Tag.update({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    res.json(dbTagData)
  })
  .catch(err => {
    res.status(400).json(err)
  })
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    res.json(dbTagData)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;
