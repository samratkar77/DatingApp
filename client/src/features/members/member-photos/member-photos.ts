import {
  Component,
  inject,
  OnInit,
  signal,
  ChangeDetectorRef,
} from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Member, Photo } from '../../../types/member';
import { ImageUpload } from '../../../shared/image-upload/image-upload';
import { AccountService } from '../../../core/services/account-service';
import { User } from '../../../types/user';
import { StarButton } from '../../../shared/star-button/star-button';
import { DeleteButton } from '../../../shared/delete-button/delete-button';

@Component({
  selector: 'app-member-photos',
  imports: [ImageUpload, StarButton, DeleteButton],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
  protected memberService = inject(MemberService);
  protected accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  protected photos = signal<Photo[]>([]);
  protected loading = signal(false);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (memberId) {
      this.memberService.getMemberPhotos(memberId).subscribe({
        next: (photos) => this.photos.set(photos),
      });
    }
  }

  onUploadImage(file: File) {
    this.loading.set(true);
    this.memberService.uploadPhoto(file).subscribe({
      next: (photo) => {
        this.memberService.editMode.set(false);
        this.loading.set(false);
        this.photos.update((photos) => [...photos, photo]);
        console.log(
          'Current member imageUrl before if:',
          this.memberService.member()?.imageUrl
        );
        if (!this.memberService.member()?.imageUrl) {
          this.setMainLocalPhoto(photo);
          console.log('after setMainLocalPhoto:', photo.url);
        }
      },
      error: (error) => {
        console.log('Error uploading image: ', error);
        this.loading.set(false);
      },
    });
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo).subscribe({
      next: () => {
        this.setMainLocalPhoto(photo);
      },
    });
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: () => {
        this.photos.update((photos) => photos.filter((x) => x.id !== photoId));
      },
    });
  }

  // private setMainLocalPhoto(photo: Photo) {
  //   const currentUser = this.accountService.currentUser();
  //   console.log('Setting main photo:', currentUser);
  //   if (currentUser) currentUser.imageUrl = photo.url;
  //   console.log('Current user imageUrl after setting:', currentUser?.imageUrl);
  //   this.accountService.setCurrentUser(currentUser as User);

  //   setTimeout(() => {
  //     this.memberService.member.update(
  //       (member) =>
  //         ({
  //           ...member,
  //           imageUrl: photo.url,
  //         } as Member)
  //     );
  //   });
  // }

  private setMainLocalPhoto(photo: Photo) {
    const currentUser = this.accountService.currentUser();
    if (currentUser) currentUser.imageUrl = photo.url;
    this.accountService.setCurrentUser(currentUser as User);

    this.memberService.member.update(
      (member) =>
        ({
          ...member,
          imageUrl: photo.url,
        } as Member)
    );
    this.cdr.markForCheck();
  }
}
