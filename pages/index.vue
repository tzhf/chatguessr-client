<template>
    <main>
        <Header>
            <Download />
        </Header>
        <section class="flex flex-col md:flex-row gap-2 my-10">
            <ReleaseNotes class="md:basis-4/5" />
            <Contributors class="flex-1" />
        </section>

        <section class="flex flex-col md:flex-row gap-x-2 gap-y-5 mb-10">
            <div class="flex-1">
                <h3 class="text-2xl font-bold text-center mb-3">How to install ?</h3>
                <div class="card">
                    <ol>
                        <li>Download &amp; install ChatGuessr</li>
                        <li>
                            Log in using your Twitch <strong>bot account</strong>.<br />
                            <small
                                >Using a bot account is recommended for security and to prevent your main account's
                                whispers from filling up</small
                            >
                        </li>
                        <li>Open the settings by clicking ⚙️</li>
                        <li>Go to <strong>Twitch connect</strong></li>
                        <li>Fill in your Twitch channel name</li>
                        <li>
                            Click <strong>Save</strong><br />
                            <small>
                                ...The bot should now be talking in your chat. Your chatguessr link will be generated.
                                (e.g.:
                                <a href="https://chatguessr.com/map/yourBot" target="_blank"
                                    >chatguessr.com/map/&lt;yourBot&gt;</a
                                >)
                            </small>
                        </li>
                    </ol>

                    <div class="card mt-2 px-5">
                        <h4 class="font-bold mb-2">Windows Defender</h4>
                        <small>
                            <p class="mb-2">
                                On install you may get a message stating: "Windows Defender SmartScreen prevented an
                                unrecognizable app from starting. Running this app might put your PC at risk."
                            </p>
                            <p class="mb-2">You can safely ignore this message and continue with your installation :</p>
                        </small>
                        <img src="https://chatguessr.com/windefender.png" alt="Windows Defender" />
                    </div>
                </div>
            </div>

            <div class="flex-1">
                <h3 class="text-2xl font-bold text-center mb-3">How to play ?</h3>
                <div class="card flex flex-col gap-2 mb-2">
                    <p class="text-center mb-3">All you need is a Twitch account, no GeoGuessr account required.</p>
                    <ol class="mb-6">
                        <li>Get the map link from the streamer (usually <span class="badge bg-primary">!cg</span>)</li>
                        <li>Login with your Twitch account</li>
                        <li>Make your guess on the map<br /></li>
                        <li>Press guess or plonk the space bar</li>
                        <p><small>That's it ! Your guess will be displayed on the scoreboard</small></p>
                    </ol>
                    <p class="text-center font-bold">Alternatively, if you can't or don't want to login :</p>
                    <ol>
                        <li>
                            Make your guess on the map<br />
                            <small>The command is automatically copied to your clipboard</small>
                        </li>
                        <li>
                            Paste
                            <pre>ctrl+v</pre>
                            the whole command in chat without editing <br />
                            <small>(e.g. /w streamer !g 3.172037, 113.041666)</small>
                        </li>
                        <small>...Your guess will be displayed on the scoreboard</small>
                    </ol>
                </div>

                <div class="card rounded-md p-3">
                    <h4 class="font-bold">Commands :</h4>
                    <p><span class="badge bg-primary">!cg</span> : Get the map link</p>
                    <p><span class="badge bg-primary">!me</span> : Get your stats</p>
                    <p><span class="badge bg-primary">!best</span> : Get the best stats of the channel</p>
                    <p>
                        <span class="badge bg-primary">!flags</span> : Get the link of available
                        <nuxt-link to="/flags">flags</nuxt-link>
                    </p>
                    <p><span class="badge bg-primary">!flag &lt;country&gt; | random | none</span> : Set a flag</p>
                    <p><span class="badge bg-primary">!randomplonk</span> : Guess random coordinates</p>
                    <p><span class="badge bg-orange-400">!clear</span> : Clear your stats</p>
                </div>
            </div>
        </section>

        <Streams />
    </main>
</template>
<script setup>
useHead({ title: "ChatGuessr" });
</script>
