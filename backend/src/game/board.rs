use serde::{Deserialize, Serialize};
use crate::game::tile::{Color, Tile};

/// The board of a player. Used to hold tiles and keep track of score.
#[derive(Serialize, Deserialize)]
pub struct Board {
    pattern: Vec<Vec<Color>>,
    wall: [[Option<Color>; 5]; 5],
    floor: Vec<Tile>,
    score: u32,
}

impl Board {
    /// Creates a new board from the given bag.
    pub fn new() -> Self {
        let pattern: Vec<Vec<Color>> = (1..=5).map(|x| Vec::with_capacity(x)).collect();
        let wall = [[None; 5]; 5];
        let floor = Vec::with_capacity(7);
        let score = 0u32;
        Board { pattern, wall, floor, score, }
    }

    /// Puts the given tiles onto the pattern, with the remaining tiles going to
    /// the floor.
    pub fn place_tiles(&mut self, tiles: &mut Vec<Tile>, color: &Color, row: usize) {
        if let Some(current_color) = self.pattern[row].first() {
            if current_color != color {
                self.drop_on_floor(tiles);
                return;
            }
        }
        while let Some(tile) = tiles.pop() {
            if self.pattern[row].len() < row {
                if let Tile::Colored(color) = tile{
                    self.pattern[row].push(color);
                    continue;
                };
            }
            self.floor.push(tile);
        }
    }

    /// Moves tiles from the pattern line to the wall, scoring according to the
    /// Azul rules.
    pub fn score(&mut self) {

    }

    /// Puts all given tiles on the floor.
    fn drop_on_floor(&mut self, tiles: &mut Vec<Tile>) {
        while let Some(tile) = tiles.pop() {
            self.floor.push(tile);
        }
    }
}