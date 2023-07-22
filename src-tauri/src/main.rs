// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Serialize;
use serde_json::Error;
use std::io::Result;
use sysinfo::{Disk, DiskExt, System, SystemExt};

#[derive(Serialize)]
struct Volume {
    name: String,
    size: u64,
    free: u64,
    path: String,
}

impl Volume {
    fn new(disk: &Disk) -> Self {
        Self {
            name: disk.name().to_string_lossy().to_string(),
            size: disk.total_space(),
            free: disk.available_space(),
            path: disk.mount_point().to_string_lossy().to_string(),
        }
    }
}

#[tauri::command]
fn get_volumes() -> String {
    let mut sys = System::new_all();
    sys.refresh_all();
    let volumes: Vec<Volume> = sys.disks().iter().map(|disk| Volume::new(disk)).collect();
    let serialized = serde_json::to_string(&volumes).unwrap();
    serialized
}

#[tauri::command]
fn get_folders_in_dir(path: &str) -> String {
    let mut folders: Vec<String> = Vec::new();
    for entry in std::fs::read_dir(path).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        if path.is_dir() {
            folders.push(path.to_string_lossy().to_string());
        }
    }
    let serialized = serde_json::to_string(&folders);
    return serialized.unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_volumes, get_folders_in_dir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
