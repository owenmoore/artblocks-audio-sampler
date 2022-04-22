import React from 'react'
import {Badge, Button, Container, Grid, TextInput, Space, Text, Title, Center} from '@mantine/core'
import {useInputState} from '@mantine/hooks'
import {PlayerRecord, PlayerStop} from 'tabler-icons-react'
// import {Tone} from 'tone/build/esm/core/Tone'

export default function Index() {
    const [generatorURL, setGeneratorURL] = React.useState('')
    const [isRecording, setIsRecording] = React.useState(false)
    const [tokenValue, setTokenValue] = useInputState('')

    // const [recorder, setRecorder] = React.useState()

    React.useEffect(() => {
        // const actx = Tone.context
        // const dest = actx.createMediaStreamDestination()
        // const recorder = new MediaRecorder(dest.stream)
    }, [])

    const getArtblockToken = tokenID => {
        setGeneratorURL('https://api.artblocks.io/generator/' + tokenID)
    }

    const startRecording = () => {
        setIsRecording(true)
    }

    const stopRecording = () => {
        setIsRecording(false)
    }

    return (
        <Container size={800}>
            <Space h="xl" />
            <Title order={2} align="center">
                Art Blocks Audio Sampler
            </Title>
            <Text align="center" size="lg">
                Enter your Token ID to load the art, initialize audio by clicking the art, then you can record.
            </Text>
            <Space h="xl" />
            <Container size={600}>
                <Grid gutter="xl">
                    <Grid.Col span={9}>
                        <TextInput
                            value={tokenValue}
                            onChange={setTokenValue}
                            placeholder="296000000"
                            size="md"
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
                                getArtblockToken(tokenValue)
                            }}
                        >
                            Load Artblock
                        </Button>
                    </Grid.Col>
                </Grid>
            </Container>
            <Space h="xl" />
            <Container size={500}>
                <iframe
                    id="iframe"
                    sandbox="allow-scripts"
                    title={tokenValue}
                    src={generatorURL}
                    style={{width: 500, height: 500, border: '1px dashed #000', background: '#EEE'}}
                ></iframe>
            </Container>
            <Space h="xl" />
            <Center>
                <Button
                    variant={isRecording ? 'filled' : 'outline'}
                    rightIcon={isRecording ? <PlayerRecord /> : <PlayerStop />}
                    disabled={generatorURL === ''}
                    color="red"
                    uppercase
                    size="md"
                    onClick={() => {
                        if (isRecording) stopRecording()
                        else startRecording()
                    }}
                >
                    {!isRecording ? 'Start' : 'Stop'}
                </Button>
            </Center>
        </Container>
    )
}
