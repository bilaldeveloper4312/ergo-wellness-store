import os
import requests
import random
import asyncio
import edge_tts
from moviepy.editor import VideoFileClip, AudioFileClip

PEXELS_API_KEY = "gBGos6usF0Up5PR0Wj54yGUSWgafJmEKo4bjAy9pVDEXtKcpV2kix1nt"

# Script content
SCRIPT = "Stop scrolling if you work at a desk all day. See this posture? This is called 'Tech Neck', and it's permanently damaging your spine and causing those daily headaches. But you can reverse it in just 10 minutes a day. This is the ErgoWellness Neck Cloud. It gently decompresses your vertebrae, restores your natural neck curve, and instantly relieves tension. Stop living with neck pain. Click the link in our bio to start your 30-day pain-free trial today!"

VOICE = "en-US-ChristopherNeural" # Deep, professional male voice

async def generate_audio(text, output_file):
    print("Generating AI Voice...")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_file)
    print(f"Voice saved to {output_file}")

def get_pexels_video(query):
    print(f"Searching Pexels for: {query}")
    headers = {"Authorization": PEXELS_API_KEY}
    url = f"https://api.pexels.com/videos/search?query={query}&orientation=portrait&per_page=15"
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        if data.get("videos"):
            # Pick a random video from top 15 results
            video_data = random.choice(data["videos"])
            # Get best quality link
            video_files = video_data.get("video_files", [])
            # Sort by quality (highest resolution first)
            video_files.sort(key=lambda x: x.get("width", 0) * x.get("height", 0), reverse=True)
            
            if video_files:
                download_link = video_files[0]["link"]
                print(f"Found Video ID {video_data['id']}. Downloading...")
                # Download it
                vid_resp = requests.get(download_link, stream=True)
                video_filename = "temp_background.mp4"
                with open(video_filename, "wb") as f:
                    for chunk in vid_resp.iter_content(chunk_size=1024*1024):
                        if chunk:
                            f.write(chunk)
                print("Download complete.")
                return video_filename
    print("Failed to fetch video from Pexels.")
    return None

def create_video(video_file, audio_file, output_file):
    print("Stitching Video and Audio together...")
    # Load video and audio
    video = VideoFileClip(video_file)
    audio = AudioFileClip(audio_file)
    
    # Loop video if audio is longer than video
    if audio.duration > video.duration:
        from moviepy.video.fx.all import loop
        video = loop(video, duration=audio.duration)
    else:
        # Cut video to audio length
        video = video.subclip(0, audio.duration)
    
    # Set the audio of the video
    final_video = video.set_audio(audio)
    
    # Render final output
    print("Rendering final MP4...")
    final_video.write_videofile(output_file, codec="libx264", audio_codec="aac", fps=30, preset="ultrafast")
    print(f"Success! Viral video saved as {output_file}")
    
    # Cleanup temps
    video.close()
    audio.close()
    final_video.close()
    if os.path.exists(video_file): os.remove(video_file)
    if os.path.exists(audio_file): os.remove(audio_file)

async def main():
    audio_file = "temp_audio.mp3"
    output_file = "viral_video_1.mp4"
    
    # Step 1: Generate Voice
    await generate_audio(SCRIPT, audio_file)
    
    # Step 2: Download Background Video
    bg_video = get_pexels_video("office desk working")
    
    # Step 3: Combine them
    if bg_video:
        create_video(bg_video, audio_file, output_file)
    else:
        print("Could not create video due to Pexels API error.")

if __name__ == "__main__":
    asyncio.run(main())
