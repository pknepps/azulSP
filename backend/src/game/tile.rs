use std::error::Error;
use std::fmt::{self, Display};
use std::hash::{Hash, Hasher};
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

#[derive(Debug)]
pub struct ColorDoesNotExist;

impl Display for ColorDoesNotExist {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "The given color does not exist.")
    }
}

impl Error for ColorDoesNotExist {}

/// The Tile is the main game piece. A tile can be 5 colors, represented by
/// this enum. Throughout the game, tiles are drafted by players and used to
/// score.
pub trait Tile {}

/// The primary tile in the game.
#[derive(Clone, Copy, PartialEq)]
pub struct ColoredTile {
    color: Color,
}

impl ColoredTile {
    /// Creates a new tile.
    pub fn new(color: Color) -> ColoredTile {
        ColoredTile { color, }
    }

    /// Tests if the tile is of the given color.
    pub fn is_color(&self, color: &Color) -> bool {
        self.color == *color
    }

    /// Gets the color of this tile.
    pub fn color(&self) -> Color {
        self.color
    }
}

impl Tile for ColoredTile {}

/// The first-player tile, which marks who gets to play first next round.
pub struct FirstPlayerTile;

impl Tile for FirstPlayerTile {}