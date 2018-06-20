extern crate v8worker2;
use v8worker2::worker::Worker as Worker;

extern crate bytes;
use std::fs::File;
use std::io::prelude::*;
use std::env;
use prost::Message;

use deno;
use os;

pub struct Runtime {
    worker: Worker
}

impl Runtime {
    pub fn start(&mut self) {
        let main_js_filename = String::from("dist/main.js");
        let mut main_js = File::open(main_js_filename).expect("File not found");
        let mut main_js_contents = String::new();
        main_js.read_to_string(&mut main_js_contents).expect("I/O error");
        self.worker.load("/main.js".to_string(), main_js_contents.clone());

        // Call denoMain
        self.worker.load("/deno_main.js".to_string(), "denoMain();".to_string());

        // Load main.map:
        let main_map_filename = String::from("dist/main.map");
        let mut main_map = File::open(main_map_filename).expect("File not found");
        let mut main_map_contents = String::new();
        main_map.read_to_string(&mut main_map_contents).expect("I/O error");

        // Get current dir
        let cwd = env::current_dir().unwrap();
        let cwd_str = cwd.into_os_string().into_string().unwrap();

        // Prepare start message:
        let mut _message = deno::Msg::default();
        _message.command = deno::msg::Command::Start as i32;
        _message.start_cwd = cwd_str;
        _message.start_main_js = main_js_contents;
        _message.start_main_map = main_map_contents;
        _message.start_debug_flag = true;
        _message.start_argv.push("readfile.ts".to_string());
        self.send_message("start".to_string(), _message);
        
    }

    fn send_message(&mut self, _channel: String, message: deno::Msg) {
        let _msg_length = message.encoded_len();
        let mut _msg_buf = Vec::with_capacity(_msg_length);
        message.encode(&mut _msg_buf).unwrap();

        let mut _base_msg = deno::BaseMsg::default();
        _base_msg.channel = _channel;
        _base_msg.payload = _msg_buf;
        let _base_msg_length = _base_msg.encoded_len();
        let mut _base_msg_buf = Vec::with_capacity(_base_msg_length);
        _base_msg.encode(&mut _base_msg_buf).unwrap();

        let data: bytes::Bytes = bytes::Bytes::from(_base_msg_buf.as_slice());
        self.worker.send_bytes(data);
    }

    fn dummy_base_msg() -> bytes::Bytes {
        let mut _base_msg = deno::BaseMsg::default();
        let _base_msg_length = _base_msg.encoded_len();
        let mut _base_msg_buf = Vec::with_capacity(_base_msg_length);
        _base_msg.encode(&mut _base_msg_buf).unwrap();
        let data: bytes::Bytes = bytes::Bytes::from(_base_msg_buf.as_slice());
        data
    }

    fn prepare_msg(msg: deno::Msg) -> bytes::Bytes {
        let _message_length = msg.encoded_len();
        let mut _buf = Vec::with_capacity(_message_length);
        msg.encode(&mut _buf).unwrap();
        bytes::Bytes::from(_buf.as_slice())
    }
}

pub fn new() -> Runtime {
    let r: Runtime;
    let cb = |incoming_data: bytes::Bytes| {
        let _m = deno::BaseMsg::decode(incoming_data).unwrap();
        let _inner_msg = deno::Msg::decode(_m.payload).unwrap();
        let cmd = _inner_msg.command;
        if cmd == deno::msg::Command::CodeFetch as i32 {
            let reply = os::code_fetch(_inner_msg.clone());
            return Runtime::prepare_msg(reply);
        }
        if cmd == deno::msg::Command::ReadFileSync as i32 {
            let reply = os::read_file_sync(_inner_msg);
            return Runtime::prepare_msg(reply);
        }
        Runtime::dummy_base_msg()
    };
    let mut _worker = Worker::new(cb);
    r = Runtime{
        worker: _worker
    };
    r
}