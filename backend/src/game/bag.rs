use crate::game::tile::Color;
use rand::Rng;
use strum::IntoEnumIterator;

/// The number of tiles of a color that exist in the game.
pub const MAX_TILES_OF_COLOR: usize = 20;

/// A bag of tiles. Upon creation, holds 20 of each color of tile and is
/// shuffled. Can be pulled from to create random draws of tiles without
/// replacement. Once used, tiles should be discarded to the bag. If an attempt
/// to pull a tile is made when no tiles are remaining in the bag, then the
/// discard pile will automatically be shuffled into the bag and then a tile
/// will be drawn. If at any point, the bag is completely empty, then no tiles
/// will be drawn.
/// ```
/// use backend::game::bag::Bag;
///
/// let mut bag = Bag::new();
/// let tile = bag.draw().unwrap();
///
/// // Do something with the tile.
///
/// bag.discard(tile);
/// ```
pub struct Bag {
    tiles: Vec<Color>,
    discard: Vec<Color>,
}

impl Bag {

    /// Creates a new bag with 20 tiles of each color, a total of 100, and an
    /// empty discard.
    pub fn new() -> Bag {
        let tiles = Vec::with_capacity(MAX_TILES_OF_COLOR * 5);
        let mut discard = Vec::with_capacity(MAX_TILES_OF_COLOR * 5);

        for color in Color::iter() {
            for _ in 0..MAX_TILES_OF_COLOR {
                discard.push(color.clone());
            }
        }

        let mut bag = Bag { tiles, discard, };
        bag.shuffle();
        bag
    }

    /// Draws a tile from the bag. If no tiles remain, shuffles the discard
    /// into the bag and draws a tile. If still no tiles remain, returns None.
    pub fn draw(&mut self) -> Option<Color> {
        if self.tiles.is_empty() {
            self.shuffle();
        }
        self.tiles.pop()
    }

    /// Puts the given tile into the discard for reuse.
    pub fn discard(&mut self, tile: Color) {
        self.discard.push(tile);
    }

    /// Shuffles the discard into the bag.
    fn shuffle(&mut self) {
        while let Some(tile) = self.discard.pop() {
            self.tiles.push(tile);
        }

        // The Fisher-Yates shuffling algorithm.
        for i in 0..self.tiles.len() {
            let rnd_index = rand::thread_rng().gen_range(0..self.tiles.len());
            (self.tiles[i], self.tiles[rnd_index]) = (self.tiles[rnd_index], self.tiles[i]);
        }
    }
}