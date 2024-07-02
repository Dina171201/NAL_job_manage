"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSidebarContext } from '@/src/component/SideNavProvider';

interface Job {
  id: number;
  name: string;
  title: string;
  status: JobStatus;  // Sử dụng JobStatus
}

enum JobStatus {
  DONE = 'done',
  INPROGRESS = 'inprogress',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newJob, setNewJob] = useState({name: '', title: '', status: JobStatus.INPROGRESS });
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { value } = useSidebarContext();
  const router = useRouter();
  const limit = 5; 
  useEffect(() => {


    console.log(value);
    
    if (!value.token) {
      router.push('/login');
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/job/list?page=${currentPage}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${value.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          
          setJobs(data.items);
          setTotalPages(data.meta.totalPages);
          setTotalItems(data.meta.totalItems);
        } else {
          throw new Error('Failed to fetch jobs');
        }
      } catch (err: any) {
        setError(err.message);
      } 
    };

    fetchJobs();
  }, [currentPage, value.token, router]);

  const handleAddJob = async () => {
    if (!value.token) return;
    try {
      const response = await fetch('http://localhost:3001/job/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${value.token}`,
        },
        body: JSON.stringify(newJob),
      });

      if (response.ok) {
        const data = await response.json();
        setJobs([...jobs, data]);
        setNewJob({ name: '', title: '', status: JobStatus.INPROGRESS });
      } else {
        throw new Error('Failed to add job');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!value.token) return;
    try {
      const response = await fetch(`http://localhost:3001/job/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${value.token}`,
        },
      });

      if (response.ok) {
        setJobs(jobs.filter(job => job.id !== id));
      } else {
        throw new Error('Failed to delete job');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateJob = async () => {
    if (!editJob || !value.token) return;

    try {
      const response = await fetch(`http://localhost:3001/job/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${value.token}`,
        },
        body: JSON.stringify(editJob),
      });

      if (response.ok) {
        const updatedJobs = jobs.map(job => (job.id === editJob.id ? editJob : job));
        setJobs(updatedJobs);
        setEditJob(null);
      } else {
        throw new Error('Failed to update job');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Job Name"
          value={newJob.name}
          onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
          className="mr-2 p-2 border"
        />
        <input
          type="text"
          placeholder="Job Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          className="mr-2 p-2 border"
        />
        {/* <select
          value={newJob.status}
          onChange={(e) => setNewJob({ ...newJob, status: e.target.value as JobStatus })}  // Chuyển đổi thành JobStatus
          className="mr-2 p-2 border"
        >
          {Object.values(JobStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select> */}
        <button onClick={handleAddJob} className="p-2 bg-blue-500 text-white">Add Job</button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Job Name</th>
              <th scope="col" className="px-6 py-3">Job Title</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map(job => (
              <tr key={job.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{job.name}</td>
                <td className="px-6 py-4">{job.title}</td>
                <td className="px-6 py-4">{job.status}</td>
                <td className="px-6 py-4">
                  <button onClick={() => setEditJob(job)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDeleteJob(job.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center pt-4">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing {currentPage} of {totalPages}
          </span>
          <div>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 bg-gray-500 text-white rounded mr-2">Previous</button>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 bg-gray-500 text-white rounded">Next</button>
          </div>
        </div>
      </div>

      {editJob && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="mb-4 text-xl font-bold">Edit Job</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateJob(); }}>
              <div>
                <label htmlFor="editJobName" className="block text-sm font-medium leading-6 text-gray-900">Job Name</label>
                <input
                  id="editJobName"
                  name="editJobName"
                  type="text"
                  value={editJob.name}
                  onChange={(e) => setEditJob({ ...editJob, name: e.target.value })}
                  className="mt-2 p-2 border block w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="editJobTitle" className="block text-sm font-medium leading-6 text-gray-900">Job Title</label>
                <input
                  id="editJobTitle"
                  name="editJobTitle"
                  type="text"
                  value={editJob.title}
                  onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
                  className="mt-2 p-2 border block w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="editJobStatus" className="block text-sm font-medium leading-6 text-gray-900">Status</label>
                <select
                  id="editJobStatus"
                  name="editJobStatus"
                  value={editJob.status}
                  onChange={(e) => setEditJob({ ...editJob, status: e.target.value as JobStatus })}  // Chuyển đổi thành JobStatus
                  className="mt-2 p-2 border block w-full"
                >
                  {Object.values(JobStatus).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button type="button" onClick={() => setEditJob(null)} className="bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
