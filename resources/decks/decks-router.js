const express = require('express')

const Decks = require('./decks-model.js')

const router = express.Router()

// GET ALL DECKS
router.get('/', (req, res) => {
   Decks.find()
      .then(decks => {
         res.json(decks)
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error retrieving the decks!" })
      })
})

// GET SPECIFIC DECK
router.get("/:id", (req, res) => {
   const id = req.params.id;

   Decks.findDeckById(id)
      .then(deck => {
         Decks.getDeckTags(req.params.id).then(tags => { // SHOWS TAGS 
            deck.tags = tags;
            res.status(201).json(deck)
         })
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error retrieving the deck!" })
      })
})

// SEE CARDS WITHIN AN EXISTING DECK
router.get('/:id/cards', (req, res) => {
   const { id } = req.params;

   Decks.findCardsByDeckId(id)
      .then(data => {
         data ?
            res.status(200).json(data) :
            res.status(404).json({ errMessage: "Cannot find deck data." })
      })
      .catch(err => {
         res.status(500).json({ errMessage: "Unable to retrieve decks by Deck ID." })
      })
})

// SEE SESSIONS WITHIN AN EXISTING DECK
router.get('/:id/sessions', (req, res) => {
   const { id } = req.params;

   Decks.findSessionsByDeckId(id)
      .then(data => {
         data ?
            res.status(200).json(data) :
            res.status(404).json({ errMessage: "Cannot find deck data." })
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "Unable to retrieve sessions by deck ID." })
      })
})

// ADD NEW DECK (POST)
router.post('/', (req, res) => {
   const deckData = req.body;

   Decks.add(deckData)
      .then(deck => {
         if (!req.body.user_id || !req.body.deck_name) {
            res.status(401).json({ errorMessage: "Please include both a user ID and a deck name!" })
         } else {
            res.status(201).json(deck)
         }
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error adding the deck." })
      })
})

// UPDATE EXISTING DECK (PUT)
router.put('/:id', (req, res) => {
   const { id } = req.params;
   const changes = req.body;

   Decks.findDeckById(id)
      .then(deck => {
         if (deck) {
            Decks.update(changes, id)
               .then(updatedDeck => {
                  res.json(updatedDeck);
               });
         } else {
            res.status(404).json({ errorMessage: "No such deck with that ID exists." });
         }
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error updating the deck." });
      });
})

// DELETE EXISTING DECK 
router.delete('/:id', (req, res) => {
   const { id } = req.params;

   Decks.remove(id)
      .then(deleted => {
         if (deleted) {
            res.json({ removed: deleted });
         } else {
            res.status(404).json({ errorMessage: "No such deck with that ID exists." });
         }
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error deleting the deck." });
      });
})

module.exports = router;