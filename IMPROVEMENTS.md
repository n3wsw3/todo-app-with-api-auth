# Possible Improvements to Security

## Pepper Rotation Strategy.

The current pepper (known as a secret in the argon2id hashing function, but will
be referred to as pepper) is static and cannot be changed without invalidating
the already existing argon2id hashes.

### Possible Solutions

### Update Hash on User Authentication

Keeping a record of the previously used peppers and storing the pepper version
along with the password hash. When a user is authenticating, validate the
password against the stored hash and with the correct pepper version. If the
authentication is successful then rehash the password, but this time with the
most up-to-date pepper, and update the hash in the database with the newly
created hash.

### Complete Invalidation

When a new pepper comes around, invalidate all passwords in the database and
force the user to update the password when authenticating.

### Hash Encryption

Ditch the built-in secret in argon2id and use symmetric encryption with the
pepper as a key and the resulting hash from argon2id as the payload. Every time
the pepper changes, the encrypted hashes can be decrypted and then reencrypted
with the new pepper.

## Maximizing argon settings.

The current settings for argon2id will not be optimized for the server running
the code. Hashing a password should preferably take no less than 100ms, as any
lower will allow cracking software to run the algorithm too fast and thus lower
the amount of time it takes to crack a hash and any time above that will slow
down any authentication attempt enough to frustrate users and/or overwhelm the
servers ability to successfully authenticate the required amount of users.

### Possible Solutions

### Benchmark at Startup

Every time the server starts up, a benchmark is run to measure the amount of
time it takes and then it will adjust the settings accordingly.

#### Cons

- Longer startup time
- Possible sub-optimal settings
- Running on low-tier hardware might lead to insecure settings

### Constant Presets

Set a default that is secure compared to the hardware currently used to crack
argon2id hashes.

#### Cons

- On high-powered hardware, the hashing will be "too fast", causing the hashing
  to not be as strong as it could be if the settings was set to match that
  specific hardware.
- Might take too long on low-tier hardware, causing the authentication to take
  too long and user experience suffering.

## Storing hashed access-tokens in db instead of plaintext.

Not strictly necessary since the tokens have an expiration date and since the
token is only used for this website. Although, when tokens with longer
expiration dates are used, the risk of an active token being stolen is greatly
increased.

The performance of the server can take a great hit when all requests to
authenticated endpoints need to go though a possibly slow hashing step. But
since the tokens only have to withstand until their expiration date, instead of
forever when it comes to passwords, the need for incredibly slow and memory
intensive hashing algorithms is lowered.

As the tokens currently has an expiration of 30 days, it would be for the better
if the tokens were hashed in the database. The hash doesn't need withstand
cracking the whole 30 days since, hopefully, a breach of the database will be
detected immediately and a wipe/deactivation of the tokens will applied within
hours.

### Salting

Since the tokens are completely randomly generated, there is no need for a
unique salt for every token. As salting is mainly a way to mitigate the risk of
the hash being in a precomputed table and to stop two identical passwords from
sharing the same hash. With a sufficiently long and random token those risks are
no longer a real problem.
