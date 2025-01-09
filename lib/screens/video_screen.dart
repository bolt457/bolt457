import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'dart:async';
import 'package:flutter/services.dart';
import 'dart:convert'; // Import nécessaire pour le décodage du JSON

class MediaCarousel extends StatefulWidget {
  const MediaCarousel({Key? key}) : super(key: key); // Constructeur constant

  @override
  _MediaCarouselState createState() => _MediaCarouselState();
}

class _MediaCarouselState extends State<MediaCarousel> {
  late VideoPlayerController _controller;
  List<dynamic> mediaItems = [];
  int currentIndex = 0;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    loadMedia();
  }

  Future<void> loadMedia() async {
    final String response = await rootBundle.loadString('assets/data.json');
    final data = json.decode(response);
    setState(() {
      mediaItems = data['media'];
      _initializeMedia();
      _startAutoScroll();
    });
  }

  void _initializeMedia() {
    if (mediaItems[currentIndex]['type'] == 'video') {
      _controller = VideoPlayerController.asset(mediaItems[currentIndex]['path'])
        ..initialize().then((_) {
          setState(() {
            _controller.play(); // Lire automatiquement la vidéo
          });
        });
    }
  }

  void _startAutoScroll() {
    _timer = Timer.periodic(const Duration(seconds: 5), (timer) {
      setState(() {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        if (mediaItems[currentIndex]['type'] == 'video') {
          _initializeMedia();
        } else if (_controller.value.isInitialized) {
          _controller.pause();
        }
      });
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    if (mediaItems.isNotEmpty && mediaItems[currentIndex]['type'] == 'video') {
      _controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Défilement de médias')),
      body: Center(
        child: mediaItems.isNotEmpty
            ? mediaItems[currentIndex]['type'] == 'image'
                ? Image.asset(mediaItems[currentIndex]['path'])
                : AspectRatio(
                    aspectRatio: _controller.value.isInitialized
                        ? _controller.value.aspectRatio
                        : 16 / 9, // Valeur par défaut
                    child: VideoPlayer(_controller),
                  )
            : const CircularProgressIndicator(),
      ),
    );
  }
}

class VideoScreen extends StatefulWidget {
  const VideoScreen({Key? key}) : super(key: key); // Constructeur constant

  @override
  _VideoScreenState createState() => _VideoScreenState();
}

class _VideoScreenState extends State<VideoScreen> {
  late VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();
    // Remplacez 'assets/video.mp4' par le chemin de votre vidéo
    _controller = VideoPlayerController.asset('assets/video.mp4')
      ..initialize().then((_) {
        setState(() {
          _controller.play(); // Lire automatiquement la vidéo
        });
      });
  }

  @override
  void dispose() {
    _controller.dispose(); // Dispose du contrôleur lors de la destruction
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Video Screen'),
      ),
      body: Center(
        child: _controller.value.isInitialized
            ? AspectRatio(
                aspectRatio: _controller.value.aspectRatio,
                child: VideoPlayer(_controller),
              )
            : const CircularProgressIndicator(), // Indicateur de chargement
      ),
    );
  }
}