use strum::IntoEnumIterator;
use std::collections::HashMap;
use std::slice::Iter;
use crate::game::{DiscardTiles, PickTiles};
use crate::game::tile::{ColorDoesNotExist, Color, ColoredTile, FirstPlayerTile};
use crate::game::tile::Tile;

/// The center of the play area which contains the leftover tiles from
/// factories as well as the first-player token until chosen from.
pub struct Center {
    tiles: HashMap<Color, Vec<Box<dyn Tile>>>,
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

impl PickTiles for Center {
    /// Picks all tiles of the given color, adding on the first-player tile, if it exists.
    fn pick(&mut self, tile: &ColoredTile) -> Result<Iter<Box<dyn Tile>>, ColorDoesNotExist> {
        let tiles = self.tiles.get(&tile.color()).unwrap();
        if tiles.is_empty() {
            return Err(ColorDoesNotExist)
        }
        if let Some(_) = &self.first_player_tile {
            tiles.push(Box::new(FirstPlayerTile));
            self.first_player_tile = None;
        }
        Ok(tiles.iter())
    }
}

impl DiscardTiles for Center {
    /// Discards the given tile to this Center.
    fn discard(&mut self, tile: ColoredTile) {
        self.tiles.get_mut(&tile.color()).unwrap().push(Box::new(tile));
    }
}