use crate::game::bag::Bag;
use crate::game::tile::{Color, ColoredTile, Tile};

/// The board of a player. Used to hold tiles and keep track of score.
pub struct Board {
    pattern: Vec<Vec<ColoredTile>>,
    wall: [[Option<ColoredTile>; 5]; 5],
    floor: Vec<Box<dyn Tile>>,
    score: u32,
    bag: Bag,
}

impl Board {
    /// Creates a new board from the given bag.
    pub fn new(bag: Bag) -> Self {
        let pattern: Vec<Vec<ColoredTile>> = (1..=5).map(|x| Vec::with_capacity(x)).collect();
        let wall = [[None; 5]; 5];
        let floor = Vec::with_capacity(7);
        let score = 0u32;
        Board { pattern, wall, floor, score, bag, }
    }

    /// Puts the given tiles onto the pattern, with the remaining tiles going to
    /// the floor.
    pub fn place_tiles(&mut self, tiles: Vec<Box<dyn Tile>>, color: &Color, row: usize) {

    }

    /// Moves tiles from the pattern line to the wall, scoring according to the
    /// Azul rules.
    pub fn score(&mut self) {

    }

    /// Puts all given tiles on the floor.
    fn drop_on_floor(&mut self, tiles: &mut Vec<Box<dyn Tile>>) {
        while let Some(tile) = tiles.pop() {
            self.floor.push(tile);
        }
    }
}