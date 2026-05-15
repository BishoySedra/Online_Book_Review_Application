// Preloaded by `bun test --preload` before every test file.
// Sets fallback values for env vars that services need at call-time,
// so tests run without a .env file (e.g. in CI).
process.env.SALT_ROUNDS ??= "10";
process.env.TOKEN_SECRET_KEY ??= "test_secret_key_do_not_use_in_production";
