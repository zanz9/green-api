'use client';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import React from "react";
import {Loader2} from "lucide-react";

export default function Home() {
    const [idInstance, setIdInstance] = React.useState<string>();
    const [apiTokenInstance, setApiTokenInstance] = React.useState<string>();

    const [output, setOutput] = React.useState<string>('');

    const [settingsLoading, setSettingsLoading] = React.useState<boolean>(false);

    async function getSettings() {
        setSettingsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${idInstance}/getSettings/${apiTokenInstance}`)
            const data = await response.json();
            const textData = JSON.stringify(data, null, 2)
            setOutput(textData)
        } catch (e) {
            console.log(e)
        } finally {
            setSettingsLoading(false)
        }
    }

    const [stateInstanceLoading, setStateInstanceLoading] = React.useState<boolean>(false);

    async function getStateInstance() {
        setStateInstanceLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
            const data = await response.json();
            const textData = JSON.stringify(data, null, 2)
            setOutput(textData)
        } catch (e) {
            console.log(e)
        } finally {
            setStateInstanceLoading(false)
        }
    }


    const [phone, setPhone] = React.useState<string>('');
    const [textMessage, setTextMessage] = React.useState<string>('');
    const [sendMessageLoading, setSendMessageLoading] = React.useState<boolean>(false);

    async function sendMessage() {
        setSendMessageLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatId: phone + '@c.us',
                    message: textMessage
                })
            })
            const data = await response.json();
            const textData = JSON.stringify(data, null, 2)
            setOutput(textData)
        } catch (e) {
            console.log(e)
        } finally {
            setSendMessageLoading(false)
        }
    }

    const [fileUrl, setFileUrl] = React.useState<string>('');
    const [sendFileLoading, setSendFileLoading] = React.useState<boolean>(false);

    async function sendFile() {
        setSendFileLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatId: phone + '@c.us',
                    urlFile: fileUrl,
                    fileName: fileUrl.split('/').pop()
                })
            })
            const data = await response.json();
            const textData = JSON.stringify(data, null, 2)
            setOutput(textData)
        } catch (e) {
            console.log(e)
        } finally {
            setSendFileLoading(false)
        }
    }

    return (
        <div className={'m-4 p-4 border-2 rounded-xl min-h-screen bg-slate-50'}>
            <div className={'text-5xl font-bold pb-6 pl-4 pt-2'}>Green Api</div>
            <div className={'grid md:grid-cols-2'}>
                <div className={'flex gap-4 flex-col px-4'}>
                    <a className={'text-blue-600 text-xl'} href={'https://console.green-api.com/'}>Get Tokens</a>
                    <Input placeholder={'Id Instance'} value={idInstance}
                           onChange={(e) => setIdInstance(e.target.value)}/>
                    <Input placeholder={'Api Token Instance'} value={apiTokenInstance}
                           onChange={(e) => setApiTokenInstance(e.target.value)}/>

                    <Button disabled={settingsLoading} onClick={getSettings}>
                        {settingsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Get Settings
                    </Button>
                    <Button disabled={stateInstanceLoading} onClick={getStateInstance}>
                        {stateInstanceLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Get State Instance
                    </Button>

                    <Input type={'tel'} placeholder={'Phone: 7771234567'}
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}/>
                    <Textarea placeholder={'Message'}
                              value={textMessage}
                              onChange={(e) => setTextMessage(e.target.value)}/>
                    <Button disabled={sendMessageLoading} onClick={sendMessage}>
                        {sendMessageLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Send Message
                    </Button>

                    <Input type={'tel'} placeholder={'Phone: 7771234567'}
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}/>
                    <Input placeholder={'File URL'}
                           value={fileUrl}
                           onChange={(e) => setFileUrl(e.target.value)}/>
                    <Button disabled={sendFileLoading} onClick={sendFile}>
                        {sendFileLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Send File By URL
                    </Button>
                </div>
                <div>
                    <Label htmlFor={'output'}>Output:</Label>
                    <Textarea id={'output'} className={'h-full'} value={output}/>
                </div>
            </div>
        </div>
    );
}
