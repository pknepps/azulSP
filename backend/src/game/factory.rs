use crate::game::bag::Bag;
use crate::game::tile::{Color, ColorDoesNotExist, Tile};
use crate::game::center::Center;
use std::error::Error;
use std::fmt::{Display, Formatter};
use serde::{Deserialize, Serialize};

// The max number of tiles a factory can hold.
const FACTORY_MAX: usize = 4;

/// Error for if the factory is not empty and should be.
#[derive(Debug)]
pub struct FactoryNotEmpty;

impl Display for FactoryNotEmpty {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "Factory is not empty.")
    }    
}

impl Error for FactoryNotEmpty {}

/// A factory holds 4 tiles which can be drafted by the players. A factory will
/// pull its tiles from the bag. Once all factories are empty, the game will go
/// to the scoring phase of the round, before filling up again.
#[derive(Serialize, Deserialize)]
pub struct Factory {
    tiles: [Option<Color>; FACTORY_MAX],
}

impl Factory {
    /// Creates a new factory and fills it from the given bag.
    pub fn new(bag: &mut Bag) -> Factory {
        let tiles = [None; FACTORY_MAX];
        let mut factory = Factory { tiles, };
        factory.fill(bag).expect("Factory should be empty.");
        factory
    }

    /// Fills the factory from the given bag. Will return an error if the
    /// factory is not empty.
    pub fn fill(&mut self, bag: &mut Bag) -> Result<(), FactoryNotEmpty> {
        if self.tiles.is_empty() {
            return Err(FactoryNotEmpty);
        }
        for i in 0..4 {
            self.tiles[i] = bag.draw();
        }
        Ok(())
    }

    /// Removes all tiles and returns all tiles of the given color.
    /// The remaining tiles are discarded to the given center.
    /// If no tiles of the given color exist, returns an error.
    fn pick(&mut self, tile: &Color, center: &mut Center) -> Result<Vec<Tile>, ColorDoesNotExist> {
        let mut tiles: Vec<Tile> = Vec::new();
        for factory_tile in self.tiles {
            let Some(factory_tile) = factory_tile else {
                continue;
            };
            if factory_tile == *tile {
                tiles.push(Tile::Colored(factory_tile));
            } else {
                center.discard(Tile::Colored(factory_tile));
            }
        }
        if tiles.is_empty() {
            return Err(ColorDoesNotExist);
        }
        Ok(tiles)
    }
}