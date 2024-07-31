use crate::game::tile::{ColorDoesNotExist, Color, Tile};

pub mod bag;
pub mod board;
pub mod center;
pub mod factory;
pub mod tile;

/// Allows the user to pick tiles from a type of this trait.
pub trait PickTiles {
    /// Picks all tiles of the given color.
    fn pick(&mut self, tile: &Color) -> Result<Vec<Tile>, ColorDoesNotExist>;
}