use std::slice::Iter;
use crate::game::tile::ColoredTile;

pub mod bag;
pub mod board;
pub mod center;
pub mod factory;
pub mod tile;

pub struct ColorDoesNotExist;

// TODO: impl error for the above

/// Allows the user to pick tiles from a type of this trait.
pub trait PickTiles {
    /// Picks all tiles of the given color.
    fn pick(&mut self, tile: &ColoredTile) -> Result<Iter<ColoredTile>, ColorDoesNotExist>;
}

/// Allows the discard of a tile to a type of this trait.
pub trait DiscardTiles {
    /// Discards the given tile to self.
    fn discard(&mut self, tile: ColoredTile);
}