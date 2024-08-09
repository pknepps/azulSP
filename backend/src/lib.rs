use crate::game::Game;
use axum::{routing::get, Router};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use hyper;
use lazy_static::lazy_static;
use std::sync::Mutex;
use axum_macros::debug_handler;

pub mod game;

lazy_static! {
    static ref GAME: Mutex<Game> = Mutex::new(Game::build(0, vec!["Preston", "Jude", "Michelle", "Ben"]).unwrap());
}

pub async fn start() {
    let app = Router::new()
        .route("/players.json", get(get_players))
        .route("/factories.json", get(get_factories))
        .route("/center.json", get(get_center));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8000")
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

#[debug_handler]
pub async fn get_players() -> impl IntoResponse {
    let json = serde_json::to_string(GAME.lock().unwrap().players());
    match json {
        Ok(json) => (StatusCode::OK, json).into_response(),
        Err(error) => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()).into_response(),
    }
}

#[debug_handler]
pub async fn get_factories() -> impl IntoResponse {
    let json = serde_json::to_string(GAME.lock().unwrap().factories());
    match json {
        Ok(json) => (StatusCode::OK, json).into_response(),
        Err(error) => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()).into_response(),
    }
}
#[debug_handler]
pub async fn get_center() -> impl IntoResponse {
    let json = serde_json::to_string(GAME.lock().unwrap().center());
    match json {
        Ok(json) => (StatusCode::OK, json).into_response(),
        Err(error) => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()).into_response(),
    }
}