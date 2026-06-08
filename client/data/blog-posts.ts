export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "pass-k53-learners-license-south-africa",
    title: "What the K53 Test Is Actually Like (And Why People Fail It)",
    excerpt: "Real talk on the three sections, which one catches confident people off guard, and what actually works when you're studying.",
    date: "2025-10-10",
    readTime: "6 min read",
    image: "/attached_assets/stock_images/student_studying_wit_04bb9099.jpg",
    category: "Education",
    tags: ["K53", "Learner's License", "Driving Test", "Study Tips", "South Africa", "Road Rules"],
    content: `
      <p>I built <a href="https://superk53.co.za" target="_blank">SuperK53</a> after watching people fail the learner's license test for reasons that had nothing to do with not knowing the material. They just did not know what they were walking into. So here is what actually happens, what trips people up, and what works when you study.</p>

      <img src="/attached_assets/stock_images/road_traffic_signs_l_ebbb0c93.jpg" alt="South African road traffic signs" class="my-8 rounded-lg shadow-lg w-full" />

      <h2>Three sections. You need to pass all three.</h2>

      <p>This catches more people than anything else. The K53 learner's test has 64 questions split into three separate sections, and each one has its own pass mark. You can score 100% in two and still fail the whole thing if the third goes wrong.</p>

      <ul>
        <li><strong>Road Traffic Signs</strong> (28 questions): need 23 to pass</li>
        <li><strong>Rules of the Road</strong> (24 questions): need 21 to pass</li>
        <li><strong>Vehicle Controls</strong> (12 questions): need 10 to pass</li>
      </ul>

      <p>People who walk in after one session with a study book usually focus on traffic signs because they feel familiar. Then the rules section hits and suddenly right-of-way questions are harder than expected. Balanced preparation matters.</p>

      <h2>The signs section is not as easy as it looks</h2>

      <p>Most people assume they know the road signs. They have been driving past them for years. Then they sit at the computer and a question shows a sign they have seen a hundred times but never actually read. The distinction between a warning sign, a regulatory sign, and a guidance sign is tested here. Shape and colour are the fastest way to lock in the categories.</p>

      <p>The ones that trip people up most are the signs that look almost identical to each other. Speed limit signs versus end-of-restriction signs versus minimum speed signs. Spend specific time on those groups.</p>

      <h2>Rules of the Road is where confident people get surprised</h2>

      <p>This is the section that catches people who already know how to drive and feel like the test should be easy. Right-of-way scenarios are precise. "Who goes first at an uncontrolled intersection?" has a specific answer under K53 rules and it is not always whoever arrived first or whoever feels like they have the right of way.</p>

      <p>Road markings, lane rules, stopping distances, what you are required to do at different types of intersections. This section rewards people who actually studied and punishes people who are going off instinct.</p>

      <h2>Vehicle Controls is short but has a high pass mark</h2>

      <p>Only 12 questions, but you need 10 correct. It covers dashboard warning lights, what different controls do, and some rules around gear use. People skip studying this section because it seems simple. Then they lose points on what the ABS warning light means, or when you are legally required to use your hazard lights, or what the parking brake is allowed to be used for.</p>

      <h2>What actually helps when you study</h2>

      <p>Practice tests. Not reading through a book once. Not watching videos. The thing that prepares you is going through actual questions, getting some wrong, understanding why, and doing it again.</p>

      <p>That is the core of what <a href="https://superk53.co.za" target="_blank">SuperK53</a> does. Exam-format practice with explanations after each answer, section-by-section scoring so you know exactly where your gaps are, and updated content that reflects the actual test. Ten focused practice sessions will do more than three hours of passive reading.</p>

      <h2>On the day</h2>

      <p>Bring your green barcoded ID book or smart ID card. Bring two passport photos. Not every DLTC has an ATM nearby so bring cash for the test fee. Arrive early. Not to cram, just because being rushed before you sit down makes it harder to think.</p>

      <p>The test runs on a computer. Read each question fully before you look at the options. The phrasing is specific and sometimes the correct answer depends on a particular word in the question. You have time. Use it.</p>

      <p>Results come back immediately. If you fail, you wait 7 days and rebook. It happens. An extra week of practice tests on <a href="https://superk53.co.za" target="_blank">SuperK53</a> is easier than most people think and usually enough to get over the line on the second attempt.</p>
    `
  },
  {
    id: "transfer-files-without-uploading-quickbridge",
    title: "Getting a File From Your Laptop to Your Phone Should Not Be This Hard",
    excerpt: "The normal options for sharing a file between two nearby devices all require uploading to a server you do not control. QuickBridge skips that step entirely.",
    date: "2025-12-01",
    readTime: "5 min read",
    image: "/attached_assets/stock_images/entrepreneur_startup_9e073f87.jpg",
    category: "Technology",
    tags: ["File Transfer", "WebRTC", "Privacy", "No Upload", "QuickBridge"],
    content: `
      <p>Not long ago I needed to move a file from my laptop to my phone. The file was on the laptop. The phone was in my hand. Both were on the same Wi-Fi. My options were: email it to myself, WhatsApp it to myself, upload it to Google Drive and open Drive on the phone, or find a cable.</p>

      <p>None of those feel like good answers for a file sitting two feet away. So I built <a href="https://quickbridge.app" target="_blank">QuickBridge</a>.</p>

      <h2>Why this problem still exists in 2025</h2>

      <p>It is mostly solved inside closed ecosystems. AirDrop if you have two Apple devices. Nearby Share if you have two Android devices on a recent version. Neither works across platforms, and both require being in the right ecosystem to begin with.</p>

      <p>Outside of those, the standard answer is cloud storage. Upload the file, download the file. Which works, but it means your data passes through a third-party server. For most files that is fine. For work documents, sensitive information, or anything you would rather keep private, it is a bigger ask than it should be.</p>

      <h2>How QuickBridge works</h2>

      <p>Open <a href="https://quickbridge.app" target="_blank">QuickBridge</a> on the device that has the file. A QR code appears. Scan it on the receiving device. The two devices connect directly, peer-to-peer over WebRTC. The file transfers between them without touching any server.</p>

      <p>No account. No install. Nothing stored anywhere. When the session ends, the connection is gone.</p>

      <p>It also handles clipboard content and short messages. Useful for getting a URL from your laptop onto your phone without typing it out. Scan the QR, sync the clipboard, done.</p>

      <h2>What WebRTC actually means here</h2>

      <p>WebRTC is a browser standard originally designed for video calls. The property that matters for this use case is that it supports direct device-to-device data transfer. There is a signalling step where a server helps the two devices find each other, but the actual file data moves directly between them. The server facilitates the introduction and then gets out of the way.</p>

      <p>The practical result: your file content is never on any server. Only the two devices involved in the session ever see the data.</p>

      <h2>When it is useful</h2>

      <p>Moving a file from computer to phone without a cable. Sharing something with someone in the same room without setting up a shared folder. Passing clipboard content between devices. Sending a sensitive document without putting it in cloud storage.</p>

      <p>It is not trying to replace Dropbox or handle long-term storage. It is for the moment when two devices need to share something right now and the usual options feel like more overhead than the task warrants.</p>

      <p>Try it at <a href="https://quickbridge.app" target="_blank">quickbridge.app</a>. Works in any browser, nothing to install.</p>
    `
  },
  {
    id: "edit-video-in-browser-calmclip",
    title: "FFmpeg Runs in the Browser Now, and I Built a Video Editor on Top of It",
    excerpt: "CalmClip trims, captions, denoises, and blurs video entirely in your browser. Nothing is uploaded. The processing happens on your device.",
    date: "2025-12-10",
    readTime: "6 min read",
    image: "/attached_assets/stock_images/home_office_desk_com_85359384.jpg",
    category: "Technology",
    tags: ["Video Editing", "Browser Tools", "FFmpeg", "Privacy", "No Upload", "CalmClip"],
    content: `
      <p>FFmpeg is one of the most capable pieces of software ever written. It handles basically every video and audio format, converts between them, trims clips, extracts audio, applies filters, generates thumbnails. It is the engine running under most video software you have used. For most of its history, using it meant a command line or a desktop install.</p>

      <p>Then someone compiled it to WebAssembly, which means it can run inside a browser tab. I spent time figuring out what you could realistically build on top of that. The result is <a href="https://calmclip.video" target="_blank">CalmClip</a>.</p>

      <h2>Why the "no upload" thing matters</h2>

      <p>Most browser-based video tools work by uploading your video to a server, processing it there, and letting you download the result. That is fine for general content. It is less fine when the recording has someone's face in it, or it is a work call, or it contains something you would rather not hand to a third party.</p>

      <p>CalmClip processes everything locally. The video never leaves your device. FFmpeg WASM runs the processing inside your browser tab. The server never sees your file.</p>

      <p>That was the actual reason I built it. I had screen recordings with browser tabs visible that contained things I did not want in the final clip. I did not want to upload those to a cloud service just to trim 30 seconds off the front.</p>

      <h2>What it does</h2>

      <p>Trimming is the obvious one. Set a start and end point, export the clip. Works on any format FFmpeg supports, which covers basically everything you will encounter.</p>

      <p>Auto-captions run Whisper AI in the browser on your audio, generate a transcript, and burn captions into the video. The accuracy is solid for clear speech. Heavy accents or noisy backgrounds reduce reliability. You can edit the transcript before burning it in.</p>

      <p>Face blur is there for privacy. If you are sharing a recording that has people in the background, the blur handles it without opening a desktop editor.</p>

      <p>Silence cutting is the one that saves the most time for anyone recording tutorials or talks. It detects and removes silent gaps automatically. A 20-minute recording with normal thinking pauses can come out as a much tighter 13 or 14 minutes without any manual trimming.</p>

      <p>Noise reduction runs a denoising pass on the audio. Useful when the recording was done somewhere with background hum or ventilation noise.</p>

      <h2>The real limitations</h2>

      <p>Processing happens on your CPU via the browser. This is slower than cloud processing. A short clip takes seconds. A 40-minute recording takes considerably longer and your laptop fans will notice. FFmpeg WASM is not as fast as native FFmpeg.</p>

      <p>It is also not a full editing suite. Multi-track timelines, colour grading, animated titles, complex compositing are not what it is for. It is for the common case: you have a clip, you need to quickly trim it or caption it or clean up the audio, and you do not want to install software or upload to a service to do it.</p>

      <h2>Try it</h2>

      <p>Open <a href="https://calmclip.video" target="_blank">calmclip.video</a> and drop a video in. No account, no install, nothing stored anywhere. The processing runs in your tab and you download the result when it finishes.</p>

      <p>If the FFmpeg WASM side of things interests you technically, the <a href="https://ffmpegwasm.netlify.app/" target="_blank">ffmpeg.wasm project</a> is worth reading. It is genuinely impressive engineering.</p>
    `
  }
];
