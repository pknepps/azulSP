use std::fmt::Display;
use std::slice::Iter;
use crate::game::tile::{ColoredTile, ColorDoesNotExist, Tile};

pub mod bag;
pub mod board;
pub mod center;
pub mod factory;
pub mod tile;

/// Allows the user to pick tiles from a type of this trait.
pub trait PickTiles {
    /// Picks all tiles of the given color.
    fn pick(&mut self, tile: &ColoredTile) -> Result<Vec<Box<dyn Tile>>, ColorDoesNotExist>;
}

/// Allows the discard of a tile to a type of this trait.
pub trait DiscardTiles {
    /// Discards the given tile to self.
    fn discard(&mut self, tile: ColoredTile);
}