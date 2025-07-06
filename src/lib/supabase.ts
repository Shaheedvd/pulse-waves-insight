
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database operations for evaluation templates
export const evaluationTemplateService = {
  async getAll() {
    const { data, error } = await supabase
      .from('evaluation_templates')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(template: any) {
    const { data, error } = await supabase
      .from('evaluation_templates')
      .insert([template])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: any) {
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
    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(evaluation: any) {
    const { data, error } = await supabase
      .from('evaluations')
      .insert([evaluation])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: any) {
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
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
    
    if (error) throw error
    return data
  },

  async create(event: any) {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: any) {
    const { data, error } = await supabase
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
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
    const { data, error } = await supabase
      .from('operations_tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createTask(task: any) {
    const { data, error } = await supabase
      .from('operations_tasks')
      .insert([task])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateTask(id: string, updates: any) {
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
