"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Textarea } from "@/components/Form";

export default function CommentSection({ strainId }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [strainId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?strainId=${strainId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          strainId,
          content: newComment
        })
      });

      if (response.ok) {
        const comment = await response.json();
        setComments(prev => [comment, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleSubmitReply = async (commentId) => {
    if (!replyContent.trim()) return;

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          strainId,
          content: replyContent,
          parentId: commentId
        })
      });

      if (response.ok) {
        const reply = await response.json();
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId 
              ? { ...comment, replies: [...comment.replies, reply] }
              : comment
          )
        );
        setReplyContent("");
        setReplyingTo(null);
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const response = await fetch(`/api/comments?commentId=${commentId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteReply = async (replyId, commentId) => {
    if (!confirm("Are you sure you want to delete this reply?")) return;

    try {
      const response = await fetch(`/api/comments?replyId=${replyId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId 
              ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
              : comment
          )
        );
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-green-300 mb-4">Comments</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-800/30 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-green-800/30 rounded mb-2"></div>
                  <div className="h-3 bg-green-800/30 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-green-300 mb-4">
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      {session ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <Textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this strain..."
            className="mb-3"
            rows={3}
          />
          <Button type="submit" disabled={!newComment.trim()}>
            Post Comment
          </Button>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
          <p className="text-green-300 text-sm">
            Please <a href="/login" className="link">sign in</a> to post comments.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="border-b border-green-700/30 pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold">
                {comment.user.image ? (
                  <img 
                    src={comment.user.image} 
                    alt={comment.user.name} 
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  comment.user.name?.charAt(0) || "?"
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-green-200">
                    {comment.user.name || "Anonymous"}
                  </span>
                  <span className="text-xs text-green-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-green-300 text-sm mb-2">{comment.content}</p>
                
                {/* Comment Actions */}
                <div className="flex items-center gap-2">
                  {session && (
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="text-xs text-green-400 hover:text-green-300"
                    >
                      Reply
                    </button>
                  )}
                  {(session?.user.id === comment.userId || session?.user.role === "ADMIN") && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  )}
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && session && (
                  <div className="mt-3 ml-4">
                    <Textarea
                      value={replyContent}
                      onChange={e => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="mb-2"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyContent.trim()}
                        className="text-xs px-3 py-1"
                      >
                        Reply
                      </Button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent("");
                        }}
                        className="text-xs text-green-400 hover:text-green-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-3 ml-4 space-y-3">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-semibold">
                          {reply.user.image ? (
                            <img 
                              src={reply.user.image} 
                              alt={reply.user.name} 
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            reply.user.name?.charAt(0) || "?"
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-green-200 text-sm">
                              {reply.user.name || "Anonymous"}
                            </span>
                            <span className="text-xs text-green-400">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-green-300 text-sm mb-1">{reply.content}</p>
                          {(session?.user.id === reply.userId || session?.user.role === "ADMIN") && (
                            <button
                              onClick={() => handleDeleteReply(reply.id, comment.id)}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {comments.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">💬</div>
          <p className="text-green-300">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
}
