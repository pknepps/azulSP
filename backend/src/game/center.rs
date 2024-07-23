use strum::IntoEnumIterator;
use std::slice::Iter;
use crate::game::{DiscardTiles, PickTiles};
use crate::game::tile::{ColorDoesNotExist, Color, ColoredTile, FirstPlayerTile};
use crate::game::tile::Tile;

/// The center of the play area which contains the leftover tiles from
/// factories as well as the first-player token until chosen from.
pub struct Center {
    tiles: Vec<Box<dyn Tile>>,
    has_first_player_tile: bool,
}

impl Center {
    /// Creates a new center with no colored-tiles and one first_player_tile.
    pub fn new() -> Center {
        let mut tiles: Vec<Box<dyn Tile>> = Vec::new();
        tiles.push(Box::new(FirstPlayerTile));
        Center {
            tiles,
            has_first_player_tile: true,
        }
    }
}

impl PickTiles for Center {
    /// Picks all tiles of the given color, adding on the first-player tile,
    /// if it exists.
    fn pick(&mut self, tile: &ColoredTile) -> Result<Vec<Box<dyn Tile>>, ColorDoesNotExist> {
        let mut match_cnt = 0;
        let mut tiles = Vec::new();
        for i in 0..self.tiles.len() {
            if self.tiles[i - match_cnt].is_color(&tile.color()) {
                tiles.push(self.tiles.remove(i));
                match_cnt += 1;
            }
        }
        if tiles.is_empty() || (self.has_first_player_tile && match_cnt == 1) {
            return Err(ColorDoesNotExist);
        }
        self.has_first_player_tile = false;
        Ok(tiles)
    }
}

impl DiscardTiles for Center {
    /// Discards the given tile to this Center.
    fn discard(&mut self, tile: ColoredTile) {
        self.tiles.push(Box::new(tile));
    }
}