use std::error::Error;
use std::fmt::{self, Display};
use std::hash::Hash;
use strum_macros::EnumIter;

/// The possible colors of tiles.
#[derive(PartialEq, Clone, Copy, EnumIter, Hash, Eq)]
pub enum Color {
    White,
    Black,
    Blue,
    Red,
    Yellow,
}

/// The Tile is the main game piece. A tile can be 5 colors, represented by
/// this enum. Throughout the game, tiles are drafted by players and used to
/// score.
#[derive(PartialEq)]
pub enum Tile {
    Colored(Color),
    FirstPlayer,
}

#[derive(Debug)]
pub struct ColorDoesNotExist;

impl Display for ColorDoesNotExist {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "The given color does not exist.")
    }
}

impl Error for ColorDoesNotExist {}