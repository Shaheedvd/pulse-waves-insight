
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if Supabase is not configured
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured - using mock client');
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

// Database operations for evaluation templates
export const evaluationTemplateService = {
  async getAll() {
    if (!supabase) {
      console.warn('Supabase not configured');
      return [];
    }
    
    const { data, error } = await supabase
      .from('evaluation_templates')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(template: any) {
    if (!supabase) {
      console.warn('Supabase not configured');
      return null;
    }
    
    const { data, error } = await supabase
      .from('evaluation_templates')
      .insert([template])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: any) {
    if (!supabase) {
      console.warn('Supabase not configured');
      return null;
    }
    
    const { data, error } = await supabase
      .from('evaluation_templates')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    if (!supabase) {
      console.warn('Supabase not configured');
      return;
    }
    
    const { error } = await supabase
      .from('evaluation_templates')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Database operations for evaluations
export const evaluationService = {
  async getAll() {
    if (!supabase) {
      console.warn('Supabase not configured');
      return [];
    }
    
    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(evaluation: any) {
    if (!supabase) {
      console.warn('Supabase not configured');
      return null;
    }
    
    const { data, error } = await supabase
      .from('evaluations')
      .insert([evaluation])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: any) {
    if (!supabase) {
      console.warn('Supabase not configured');
      return null;
    }
    
    const { data, error } = await supabase
      .from('evaluations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Database operations for events (Smart Scheduler)
export const eventService = {
  async getAll() {
    if (!supabase) {
      console.warn('Supabase not configured');
      return [];
    }
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
    
    if (error) throw error
    return data
  },

  async create(event: any) {
    if (!supabase) {
      console.warn('Supabase not configured');
      return null;
    }
    
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: any) {
    if (!supabase) {
      console.warn('Supabase not configured');
      return null;
    }
    
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    if (!supabase) {
      console.warn('Supabase not configured');
      return;
    }
    
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Database operations for operations data
export const operationsService = {
  async getTasks() {
    if (!supabase) {
      console.warn('Supabase not configured');
      return [];
    }
    
    const { data, error } = await supabase
      .from('operations_tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createTask(task: any) {
    if (!supabase) {
      console.warn('Supabase not configured');
      return null;
    }
    
    const { data, error } = await supabase
      .from('operations_tasks')
      .insert([task])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateTask(id: string, updates: any) {
    if (!supabase) {
      console.warn('Supabase not configured');
      return null;
    }
    
    const { data, error } = await supabase
      .from('operations_tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}
