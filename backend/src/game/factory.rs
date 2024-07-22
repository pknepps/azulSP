use crate::game::{bag::Bag, tile::ColoredTile, ColorDoesNotExist, center::Center, PickTiles};
use std::error::Error;
use std::slice::Iter;

// The max number of tiles a factory can hold.
const FACTORY_MAX: usize = 4;

/// Error for if the factory is not empty and should be.
#[derive(Debug)]
pub struct FactoryNotEmpty;

// TODO: impl error for the above

/// A factory holds 4 tiles which can be drafted by the players. A factory will
/// pull its tiles from the bag. Once all factories are empty, the game will go
/// to the scoring phase of the round, before filling up again.
pub struct Factory {
    tiles: [Option<ColoredTile>; FACTORY_MAX],
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
        self.tiles = [bag.draw(); 4];
        Ok(())
    }

}

impl PickTiles for Factory {
    /// Removes all tiles and returns all tiles of the given color.
    /// The remaining tiles are discarded to the given center.
    /// If no tiles of the given color exist, returns an error.
    fn pick(&mut self, tile: &ColoredTile) -> Result<Iter<ColoredTile>, ColorDoesNotExist> {
        let chosen_tiles = Vec::new();
        todo!();
        if chosen_tiles.is_empty() {
            return Err(ColorDoesNotExist);
        }
        Ok(chosen_tiles.iter())
    }
}