import React from 'react'
import Helmet from 'react-helmet'
import {Badge, Button, Container, Grid, TextInput, Space, Text, Title, Center} from '@mantine/core'
import {useInputState} from '@mantine/hooks'
import {PlayerRecord, PlayerStop} from 'tabler-icons-react'
import {fetchProject, fetchToken} from '../js/query'
import recode from '../js/recode'

async function getArtblockToken(tokenID) {
    tokenID = String(tokenID)
    const id = parseInt(tokenID, 10)

    if (isNaN(id)) {
        throw new Error('tokenId in query is not a number')
    }

    const C = 1000000
    const projNumber = Math.floor(id / C)

    const project = await fetchProject(projNumber)
    const token = await fetchToken(id)

    if (project === null || token === null) {
        throw new Error('Token ID provided resulting in "null" project and/or token')
    }

    return {
        project,
        token,
    }
}

export default function Index() {
    const [data, setData] = React.useState()
    const [inputValue, setInputValue] = useInputState('')
    const [hasLoaded, setHasLoaded] = React.useState(false)
    const [isRecording, setIsRecording] = React.useState(false)

    const [tokenData, setTokenData] = React.useState()

    React.useEffect(() => {
        if (data === undefined) return
        if (data.token === undefined || data.token === null) return
        if (data.project === undefined || data.project === null) return

        const tokenData = {
            hash: data.token.hash,
            tokenId: String(data.token.id),
        }
        setTokenData(`let tokenData = ${JSON.stringify(tokenData)};`)

        let script, timeout

        timeout = setTimeout(() => {
            let code = String(data.project.script)
            code = recode(code, data.project.id)

            script = document.createElement('script')
            script.text = code
            document.body.appendChild(script)
        }, 100)

        return () => {
            clearTimeout(timeout)
            document.body.removeChild(script)
        }
    }, [data])

    const startRecording = () => {
        setIsRecording(true)
    }

    const stopRecording = () => {
        setIsRecording(false)
    }

    return (
        <>
            <Helmet>
                <title>Art Blocks Audio Sampler</title>
                {tokenData ? <script>{tokenData}</script> : null}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.15/Tone.js"></script>
            </Helmet>
            <Container size={800}>
                <Space h="xl" />
                <Title order={2} align="center">
                    Art Blocks Audio Sampler
                </Title>
                <Text align="center" size="lg">
                    Enter your Token ID and load it, initialize audio by clicking on the art, then start to record.
                </Text>
                <Space h="xl" />
                <Container size={600}>
                    <Grid gutter="xl">
                        <Grid.Col span={9}>
                            <TextInput
                                value={inputValue}
                                onChange={setInputValue}
                                placeholder="296000000"
                                size="md"
                                disabled={hasLoaded}
                                rightSectionWidth={120}
                                rightSection={
                                    <Badge color="dark" variant="dot">
                                        Token ID
                                    </Badge>
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Button
                                onClick={() => {
                                    if (hasLoaded) window.location.reload()
                                    getArtblockToken(inputValue)
                                        .then(data => {
                                            console.log(data)
                                            setData(data)
                                            setHasLoaded(true)
                                        })
                                        .catch(error => {
                                            throw new Error(`problem getting token: \n${error}`)
                                        })
                                }}
                                color={hasLoaded ? 'red' : 'default'}
                            >
                                {!hasLoaded ? 'Load Token' : 'Start Over'}
                            </Button>
                        </Grid.Col>
                    </Grid>
                </Container>
                <Space h="xl" />
                <Container size={500}>
                    <div style={{width: 500, height: 500, border: '1px dashed #000', background: '#EEE'}}>
                        <canvas id="canvas"></canvas>
                    </div>
                </Container>
                <Space h="xl" />
                <Center>
                    <Button
                        variant={isRecording ? 'filled' : 'outline'}
                        rightIcon={isRecording ? <PlayerRecord /> : <PlayerStop />}
                        color="red"
                        uppercase
                        size="md"
                        disabled={!hasLoaded}
                        onClick={() => {
                            if (isRecording) stopRecording()
                            else startRecording()
                        }}
                    >
                        {!isRecording ? 'Start' : 'Stop'}
                    </Button>
                </Center>
                <Space h="xl" />
                <Container style={{marginTop: 20}}>
                    <Grid>
                        <Grid.Col span={3}>
                            Supported projects:
                            <ul style={{margin: 10, padding: 0}}>
                                <li>Flux (296)</li>
                            </ul>
                        </Grid.Col>
                        <Grid.Col span={9}>
                            Each project integration requires both the artist's permission and technical knowledge of their script so that small modifications can be made to
                            connect the audio outputs to the recording device. Please file a{' '}
                            <a href="https://github.com/owenmoore/artblocks-audio-sampler/issues/new" target="_blank">
                                GitHub Issue
                            </a>{' '}
                            with relevant information to request it.
                        </Grid.Col>
                    </Grid>
                </Container>
            </Container>
        </>
    )
}
