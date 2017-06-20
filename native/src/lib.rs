#[macro_use]
extern crate neon;
extern crate regex;

use neon::vm::{Call, JsResult, Lock};
use neon::mem::Handle;
use neon::js::{JsInteger, JsString};
use neon::js::binary::JsBuffer;

use std::str;
use std::collections::HashMap;
use regex::Regex;

fn get_words_freq(text: &str) -> HashMap<&str, i32> {
    let re = Regex::new(r"[A-zÀ-ú]+").unwrap();
    let mut count = 0;
    re.captures_iter(text)
        .map(|w| w.get(0).map_or("", |m| m.as_str()))
        .fold(HashMap::new(), |mut stats, word| {
            if stats.contains_key(&word) {
                count = &stats[word] + 1;
                stats.insert(word, count);
            } else {
                stats.insert(word, 1);
            }
            return stats
    })
}

fn top_word(call: Call) -> JsResult<JsString> {
    let scope = call.scope;
    let mut buffer: Handle<JsBuffer> = try!(try!(call.arguments.require(scope, 0)).check::<JsBuffer>());
    let top: Vec<_> = buffer.grab(|data| {
        let text = str::from_utf8(data.as_slice()).ok().unwrap();
        let words_freq = get_words_freq(text);
        let mut stats_vec: Vec<_> = words_freq.iter().collect();
        stats_vec.sort_by(|a, b| b.1.cmp(a.1));
        stats_vec.into_iter().filter(|&wf| wf.0.len() > 4).take(1).map(|wf| *wf.0).collect()
    });
    Ok(JsString::new(scope, top[0]).unwrap())
}

fn calculate_fibonacci(x: i32) -> i32 {
    if x <= 2 {
        return 1;
    } else {
        return calculate_fibonacci(x - 1) + calculate_fibonacci(x - 2);
    }
}

fn fibonacci(call: Call) -> JsResult<JsInteger> {
    let scope = call.scope;
    let num: Handle<JsInteger> = try!(try!(call.arguments.require(scope, 0)).check::<JsInteger>());
    let res = calculate_fibonacci(num.value() as i32);
    Ok(JsInteger::new(scope, res))
}

register_module!(m, {
    m.export("fibonacci", fibonacci);
    m.export("top_word", top_word)
});


