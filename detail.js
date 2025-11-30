const songs = [
    {
        id: 'song-1',
        context: '새벽 밤',
        title: '별이 빛나는 밤에',
        artist: '김새벽',
        description: '도시의 소음이 잦아들 때, 창문으로 들어오는 차가운 공기와 함께 듣기 좋은 곡입니다. 복잡한 마음을 잠시 내려놓고 밤하늘의 고요함을 느껴보세요.',
        imageUrl: 'https://placehold.co/300x300/171b22/a87932?text=Song+1+Cover',
        color: 'bg-gray-800' // Tailwind 클래스로 색상 지정
    },
    {
        id: 'song-2',
        context: '운동하면서',
        title: '숨 고르기',
        artist: 'Running Mate',
        description: '격렬한 운동 후 찾아오는 안정감을 담은 노래입니다. 심박수가 천천히 내려가듯, 지친 몸과 마음을 달래주는 미니멀한 멜로디가 특징입니다.',
        imageUrl: 'https://placehold.co/300x300/1e2630/80848a?text=Song+2+Cover',
        color: 'bg-indigo-900' // Tailwind 클래스로 색상 지정
    },
    {
        id: 'song-3',
        context: '버스에서',
        title: '창가에서 바라본 풍경',
        artist: 'Journey Folk',
        description: '창밖으로 빠르게 지나가는 풍경과 대비되는 잔잔함이 매력입니다. 목적지 없이 흘러가는 기분으로 듣기 좋으며, 따뜻한 어쿠스틱 사운드가 마음을 편안하게 감싸줍니다.',
        imageUrl: 'https://placehold.co/300x300/283340/a0aec0?text=Song+3+Cover',
        color: 'bg-blue-900' // Tailwind 클래스로 색상 지정
    },
    {
        id: 'song-4',
        context: '꿀꿀할 때',
        title: '다 괜찮아져',
        artist: 'The Comforter',
        description: '기분 전환이 필요할 때 듣는 희망찬 멜로디. 밝고 경쾌하지만 부담스럽지 않은 리듬으로, 어딘가 우울했던 마음을 털어내고 다시 일어설 힘을 줍니다.',
        imageUrl: 'https://placehold.co/300x300/4a5568/e2e8f0?text=Song+4+Cover', 
        color: 'bg-slate-800' // Tailwind 클래스로 색상 지정
    }
];

/**
 * 노래 섹션을 생성하는 함수
 * @param {object} song - 노래 정보 객체
 * @returns {string} - HTML 문자열
 */
function createSongSection(song) {
    const bgColorClass = song.color;

    return `
        <section id="${song.id}" class="song-section full-screen-section scroll-snap-item ${bgColorClass} flex-col lg:flex-row items-center justify-center p-8 space-y-10 lg:space-y-0 lg:space-x-20 relative">
            <div class="absolute top-8 left-8 text-sm md:text-base font-semibold text-white bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full shadow-lg">
                ${song.context}
            </div>

            <div class="lp-record flex-shrink-0" data-song-id="${song.id}" style="background-image: url('${song.imageUrl}'); background-size: cover; background-position: center;">
                <div class="w-full h-full flex flex-col items-center justify-center text-center p-12 backdrop-filter backdrop-blur-sm bg-black/40 rounded-full">
                    <span class="text-white text-3xl font-bold">${song.artist}</span>
                    <span class="text-gray-300 text-lg mt-1">${song.title}</span>
                </div>
            </div>

            <div class="max-w-xl text-center lg:text-left">
                <h2 class="text-4xl md:text-6xl font-extrabold mb-4 text-white">${song.title}</h2>
                <h3 class="text-xl md:text-2xl font-medium mb-6 text-gray-300">${song.artist}</h3>
                <p class="text-base md:text-lg text-gray-400 leading-relaxed border-l-4 border-white/50 pl-4">
                    ${song.description}
                </p>
                <button onclick="alert_custom('\'${song.title}\' 곡을 재생합니다.')" class="mt-8 inline-block px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition duration-300 shadow-md">
                    전체 듣기 &rarr;
                </button>
            </div>
        </section>
    `;
}


// alert() 대신 커스텀 메시지 박스를 사용
function alert_custom(message) {
    const customAlert = document.createElement('div');
    customAlert.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50';
    customAlert.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-sm mx-4 text-center border-t-4 border-indigo-500">
            <p class="text-white text-lg mb-4">${message}</p>
            <button onclick="this.parentNode.parentNode.remove()" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">확인</button>
        </div>
    `;
    document.body.appendChild(customAlert);
}


// 페이지 로드 후 노래 섹션들을 삽입하고 인터랙션 활성화
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('song-container');
    
    if (!container) {
        console.error("Error: Element with id 'song-container' not found in the DOM.");
        return; 
    }
    
    // 모든 노래 섹션 HTML을 생성하고 삽입
    let allSectionsHtml = '';
    songs.forEach(song => {
        allSectionsHtml += createSongSection(song);
    });
    container.innerHTML = allSectionsHtml;
    
    // IntersectionObserver 설정 (LP 회전 애니메이션 제어)
    // 노래 섹션이 생성된 후에 선택해야 합니다.
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // 메인 헤더는 무시
            if(entry.target.id === 'main-header') return;
            
            const lpRecord = entry.target.querySelector('.lp-record');
            
            if (lpRecord) {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    // 섹션이 화면의 50% 이상 보일 때
                    lpRecord.classList.add('is-playing');
                } else {
                    // 섹션이 화면 밖으로 나가거나 50% 미만일 때
                    lpRecord.classList.remove('is-playing');
                }
            }
        });
    }, {
        root: null, // 뷰포트를 기준으로
        threshold: 0.5 // 섹션의 50%가 보일 때 콜백 실행
    });

    // 모든 섹션 관찰 시작
    document.querySelectorAll('.scroll-snap-item').forEach(section => {
        observer.observe(section);
    });
});