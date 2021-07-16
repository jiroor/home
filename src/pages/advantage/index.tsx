import { useEffect, useState } from 'react'

import NumberEasing from './NumberEasing'
import styles from '../../styles/Advantage.module.css'

interface Vote {
  voteIndex: number;
  voteText: string;
  color: string;
  voteCount: number;
  voteRate: number;
}

const defaultVote = {
  voteIndex: 0,
  voteText: '',
  color: '#999999',
  voteCount: 0,
  voteRate: 0
};

const fetchVotes = (): Promise<Vote[]> => {
  const movieId = location.search.match(/movie_id=([^&]+)/)?.[1];
  const url = `https://public.openrec.tv/external/api/v5/ext-vote/polls?movie_id=${movieId}&limit=1&offset=0&latest=true`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data[0])
    .then((poll) => poll.votes
      .map((vote) => ({
        voteIndex: vote.vote_index,
        voteText: vote.vote_text,
        color: vote.color,
        voteCount: vote.vote_count,
        voteRate: vote.vote_rate
      }))
    )
    .catch(() => {
      const allVoteCount = Math.floor(Math.random() * 100);
      const voteCount1 = Math.floor(Math.random() * allVoteCount);
      const voteCount2 = allVoteCount - voteCount1;

      return [{
        voteIndex: 1,
        voteText: 'ヒイロ',
        color: '#ff0000',
        voteCount: voteCount1,
        voteRate: Math.ceil(voteCount1 / allVoteCount * 100)
      }, {
        voteIndex: 2,
        voteText: 'ルシア',
        color: '#0000ff',
        voteCount: voteCount2,
        voteRate: Math.floor(voteCount2 / allVoteCount * 100)
      }];
    })
};

export default function Advantage() {
  const [votes, setVotes] = useState<Vote[]>([{
    ...defaultVote,
    voteIndex: 1
  }, {
    ...defaultVote,
    voteIndex: 2
  }]);
  useEffect(() => {
    let pollingId;
    (async function get() {
      const votes = await fetchVotes();
      setVotes(votes);
      pollingId = setTimeout(get, 2000)
    })();
    return () => clearTimeout(pollingId);
  }, []);

  const progressTracks = votes
    .map((vote) => (
      <div
        key={vote.voteIndex}
        className={styles.progressTrack}
        style={{
          width: `${vote.voteRate}%`,
          backgroundColor: vote.color
        }}>
      </div>
    ))

  const rates = votes
    .map((vote, index) => (
      <div
        key={vote.voteIndex}
        className={styles.rate}
        style={{
          [index === 0 ? 'left' : 'right']: 0
        }}>
        <NumberEasing
          value={vote.voteRate}
          speed={300}
          decimals={0}
          ease='quintOut' />%
      </div>
    ))

  return (
    <div className={styles.container}>
      <div className={styles.advantage}>
        <div className={styles.progress}>
          {progressTracks}
        </div>
        <div className={styles.rates}>
          {rates}
        </div>
      </div>
    </div>
  );
}
