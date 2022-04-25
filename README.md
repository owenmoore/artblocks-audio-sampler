# artblocks-audio-sampler
Sampling audio from Art Blocks projects to WAV files.

`gatsby build`

`npm run deploy`

## Supported Projects

The following projects are supported.

- Flux (296)

### Request a project

Each project integration requires both the artist's permission and technical knowledge of their script so that small modifications can be made to connect the audio outputs to the recording device. Please file a GitHub Issue with relevant information to request it.

#### Modifying Artist Code

The following modifications are necessary for integrating an artist's script to use this app:

- Loads into existing `canvas` object
- Fit into the existing `500px` square target div
- Connect audio that goes to destination/master to the recording device

## Attribution

Thanks to Matt DesLauriers for various scripts and structures I adopted from:

https://github.com/mattdesl/artblocks-renderer/