'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { TeamDrawer } from '@/components/admin/TeamDrawer';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export function TeamClient({ initialTeam }: { initialTeam: any[] }) {
  const [team, setTeam] = useState(initialTeam);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const supabase = createClient();

  const handleAdd = () => {
    setSelectedMember(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (member: any) => {
    setSelectedMember(member);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string, photo_url: string) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw error;
      
      setTeam(team.filter(m => m.id !== id));
      toast.success('Team member deleted');

      // Best effort to clean up image
      if (photo_url) {
        const fileName = photo_url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('team-photos').remove([fileName]);
        }
      }
    } catch (err: any) {
      toast.error('Failed to delete member');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Team</h1>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-tealLight transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-offWhite text-textMid text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 w-16">Photo</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Designation</th>
                <th className="px-6 py-4">Leadership</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {team.length > 0 ? (
                team.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {member.photo_url ? (
                        <img src={member.photo_url} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-tealPale text-teal font-bold flex items-center justify-center">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-primary">{member.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-textMid">
                      {member.designation}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold uppercase ${
                        member.is_leadership ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {member.is_leadership ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(member)}
                          className="w-8 h-8 rounded bg-gray-50 text-textMid hover:bg-tealPale hover:text-teal flex items-center justify-center transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(member.id, member.photo_url)}
                          className="w-8 h-8 rounded bg-gray-50 text-textMid hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-textMid">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TeamDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        member={selectedMember} 
      />
    </div>
  );
}
