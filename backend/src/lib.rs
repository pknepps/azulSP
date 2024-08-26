use crate::game::Game;
use axum::{routing::get, Router};
use axum::http::{HeaderValue, Method, StatusCode};
use axum::response::{IntoResponse};
use lazy_static::lazy_static;
use std::sync::Mutex;
use axum_macros::debug_handler;
use serde_json;
use tower_http::cors;

pub mod game;

lazy_static! {
    static ref GAME: Mutex<Game> = Mutex::new(Game::build(0, vec![0, 1, 2, 3]).unwrap());
}

pub async fn start() {
    let cors_layer = cors::CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap());

    let app = Router::new()
        .route("/players.json", get(get_players))
        .route("/factories.json", get(get_factories))
        .route("/center.json", get(get_center))
        .layer(cors_layer);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8000")
        .await
        .unwrap();

    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

#[debug_handler]
pub async fn get_players() -> impl IntoResponse {
    println!("Received request for players.");
    let json = serde_json::to_string(GAME.lock().unwrap().players());
    match json {
        Ok(json) => (StatusCode::OK, json).into_response(),
        Err(error) => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()).into_response(),
    }
}

#[debug_handler]
pub async fn get_factories() -> impl IntoResponse {
    println!("Received request for factories.");
    let json = serde_json::to_string(GAME.lock().unwrap().factories());
    match json {
        Ok(json) => (StatusCode::OK, json).into_response(),
        Err(error) => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()).into_response(),
    }
}

#[debug_handler]
pub async fn get_center() -> impl IntoResponse {
    println!("Received request for center.");
    let json = serde_json::to_string(GAME.lock().unwrap().center());
    match json {
        Ok(json) => (StatusCode::OK, json).into_response(),
        Err(error) => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()).into_response(),
    }
}