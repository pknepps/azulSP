use crate::game::tile::{Color, ColoredTile, FirstPlayerTile};
use strum::IntoEnumIterator;
use std::collections::HashMap;

/// The center of the play area which contains the leftover tiles from
/// factories as well as the first-player token until chosen from.
pub struct Center {
    tiles: HashMap<Color, Vec<ColoredTile>>,
    first_player_tile: Option<FirstPlayerTile>,
}

impl Center {
    /// Creates a new center with no colored-tiles and one first_player_tile.
    pub fn new() -> Center {
        let mut tiles = HashMap::new();
        for color in Color::iter() {
            tiles.insert(color, Vec::new());
        }
        Center {
            tiles,
            first_player_tile: Some(FirstPlayerTile),
        }
    }
}