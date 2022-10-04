<?php

namespace App\Listeners;

use App\Models\User;
use App\Events\PostCreated;
use App\Notifications\NewPost;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendPostCreatedNotifications implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Handle the event.
     *
     * @param  \App\Events\PostCreated  $event
     * @return void
     */
    public function handle(PostCreated $event)
    {
        foreach (User::whereNot('id', $event->post->user_id)->cursor() as $user) {
            $user->notify(new NewPost($event->post));
        }
    }
}
