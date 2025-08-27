import { supabase } from '../lib/supabase';

export const electionService = {
  // Election Results Operations
  async getElectionResults(filters = {}) {
    try {
      let query = supabase?.from('election_results')?.select(`
          *,
          election:elections(*),
          constituency:constituencies(*),
          candidate:candidates(*),
          party:parties(*)
        `)?.order('votes_received', { ascending: false })

      // Apply filters
      if (filters?.year) {
        query = query?.eq('elections.election_year', filters?.year)
      }
      
      if (filters?.party) {
        query = query?.eq('parties.short_name', filters?.party)
      }
      
      if (filters?.constituency) {
        query = query?.ilike('constituencies.name_en', `%${filters?.constituency}%`)
      }
      
      if (filters?.searchQuery) {
        query = query?.or(`
          candidates.name_en.ilike.%${filters?.searchQuery}%,
          candidates.name_ta.ilike.%${filters?.searchQuery}%,
          constituencies.name_en.ilike.%${filters?.searchQuery}%,
          constituencies.name_ta.ilike.%${filters?.searchQuery}%,
          parties.name_en.ilike.%${filters?.searchQuery}%,
          parties.short_name.ilike.%${filters?.searchQuery}%
        `)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching election results:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Election results fetch failed:', error)
      return []
    }
  },

  async getElectionResultById(id) {
    try {
      const { data, error } = await supabase?.from('election_results')?.select(`
          *,
          election:elections(*),
          constituency:constituencies(*),
          candidate:candidates(*),
          party:parties(*)
        `)?.eq('id', id)?.single()

      if (error) {
        console.error('Error fetching election result:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Election result fetch failed:', error)
      return null
    }
  },

  // Elections Operations
  async getElections() {
    try {
      const { data, error } = await supabase?.from('elections')?.select('*')?.order('election_year', { ascending: false })

      if (error) {
        console.error('Error fetching elections:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Elections fetch failed:', error)
      return []
    }
  },

  async getElectionYears() {
    try {
      const { data, error } = await supabase?.from('elections')?.select('election_year')?.order('election_year', { ascending: false })

      if (error) {
        console.error('Error fetching election years:', error)
        return []
      }

      return data?.map(item => item?.election_year) || [];
    } catch (error) {
      console.error('Election years fetch failed:', error)
      return []
    }
  },

  // Constituencies Operations
  async getConstituencies() {
    try {
      const { data, error } = await supabase?.from('constituencies')?.select('*')?.order('constituency_number')

      if (error) {
        console.error('Error fetching constituencies:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Constituencies fetch failed:', error)
      return []
    }
  },

  async getConstituencyById(id) {
    try {
      const { data, error } = await supabase?.from('constituencies')?.select('*')?.eq('id', id)?.single()

      if (error) {
        console.error('Error fetching constituency:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Constituency fetch failed:', error)
      return null
    }
  },

  // Candidates Operations
  async getCandidates(filters = {}) {
    try {
      let query = supabase?.from('candidates')?.select(`
          *,
          party:parties(*)
        `)?.eq('status', 'approved')?.order('name_en')

      // Apply filters
      if (filters?.party) {
        query = query?.eq('parties.short_name', filters?.party)
      }
      
      if (filters?.searchQuery) {
        query = query?.or(`
          name_en.ilike.%${filters?.searchQuery}%,
          name_ta.ilike.%${filters?.searchQuery}%,
          parties.name_en.ilike.%${filters?.searchQuery}%,
          parties.short_name.ilike.%${filters?.searchQuery}%
        `)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching candidates:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Candidates fetch failed:', error)
      return []
    }
  },

  async getCandidateById(id) {
    try {
      const { data, error } = await supabase?.from('candidates')?.select(`
          *,
          party:parties(*),
          election_results:election_results(
            *,
            election:elections(*),
            constituency:constituencies(*)
          )
        `)?.eq('id', id)?.single()

      if (error) {
        console.error('Error fetching candidate:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Candidate fetch failed:', error)
      return null
    }
  },

  // Parties Operations
  async getParties() {
    try {
      const { data, error } = await supabase?.from('parties')?.select('*')?.eq('is_active', true)?.order('name_en')

      if (error) {
        console.error('Error fetching parties:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Parties fetch failed:', error)
      return []
    }
  },

  async getPartyById(id) {
    try {
      const { data, error } = await supabase?.from('parties')?.select(`
          *,
          candidates:candidates(*),
          election_results:election_results(
            *,
            election:elections(*),
            constituency:constituencies(*)
          )
        `)?.eq('id', id)?.single()

      if (error) {
        console.error('Error fetching party:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Party fetch failed:', error)
      return null
    }
  },

  // Analytics and Statistics
  async getElectionStatistics(electionYear) {
    try {
      const { data: results, error } = await supabase?.from('election_results')?.select(`
          *,
          election:elections!inner(*),
          party:parties(*)
        `)?.eq('elections.election_year', electionYear)

      if (error) {
        console.error('Error fetching election statistics:', error)
        return null
      }

      // Calculate statistics
      const totalVotes = results?.reduce((sum, result) => sum + (result?.votes_received || 0), 0) || 0
      const totalSeats = results?.filter(result => result?.is_winner)?.length || 0
      const parties = {}
      
      results?.forEach(result => {
        const partyName = result?.party?.short_name || 'Independent'
        if (!parties?.[partyName]) {
          parties[partyName] = { seats: 0, votes: 0 }
        }
        
        parties[partyName].votes += result?.votes_received || 0
        if (result?.is_winner) {
          parties[partyName].seats += 1
        }
      })

      return {
        totalVotes,
        totalSeats,
        partyWiseResults: parties,
        totalConstituencies: totalSeats
      }
    } catch (error) {
      console.error('Election statistics fetch failed:', error)
      return null
    }
  },

  // User Bookmarks Operations
  async getCandidateBookmarks(userId) {
    try {
      const { data, error } = await supabase?.from('candidate_bookmarks')?.select(`
          *,
          candidate:candidates(
            *,
            party:parties(*)
          )
        `)?.eq('user_id', userId)?.order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching bookmarks:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Bookmarks fetch failed:', error)
      return []
    }
  },

  async addCandidateBookmark(userId, candidateId, notes = '') {
    try {
      const { data, error } = await supabase?.from('candidate_bookmarks')?.insert([{
          user_id: userId,
          candidate_id: candidateId,
          notes
        }])?.select(`
          *,
          candidate:candidates(
            *,
            party:parties(*)
          )
        `)?.single()

      if (error) {
        console.error('Error adding bookmark:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Add bookmark failed:', error)
      return null
    }
  },

  async removeCandidateBookmark(userId, candidateId) {
    try {
      const { error } = await supabase?.from('candidate_bookmarks')?.delete()?.eq('user_id', userId)?.eq('candidate_id', candidateId)

      if (error) {
        console.error('Error removing bookmark:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Remove bookmark failed:', error)
      return false
    }
  },

  async updateCandidateBookmark(userId, candidateId, notes) {
    try {
      const { data, error } = await supabase?.from('candidate_bookmarks')?.update({ notes })?.eq('user_id', userId)?.eq('candidate_id', candidateId)?.select(`
          *,
          candidate:candidates(
            *,
            party:parties(*)
          )
        `)?.single()

      if (error) {
        console.error('Error updating bookmark:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Update bookmark failed:', error)
      return null
    }
  }
}