package org.kub.web.tutorial.claim.model;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the tblNotes database table.
 * 
 */
@Entity
@Table(name="tblNotes")
@NamedQueries({
    @NamedQuery(name="Note.getList", query="SELECT n FROM Note n WHERE n.incidentId = :incidentId ORDER BY n.createDate ASC"),
    @NamedQuery(name="Note.getListAll", query="SELECT n FROM Note n ORDER BY n.createDate ASC"),
    @NamedQuery(name="Note.getCount", query="SELECT COUNT(n) FROM Note n WHERE n.incidentId = :incidentId"),
    @NamedQuery(name="Note.getCountAll", query="SELECT COUNT(n) FROM Note n")
})
public class Note implements Serializable {
	private static final long serialVersionUID = 1L;
	private long noteId;
	private Timestamp createDate;
	private String createdBy;
	private Timestamp editDate;
	private String editedBy;
	private long incidentId;
	private String note;

	public Note() {
	}


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="NoteId")
	public long getNoteId() {
		return this.noteId;
	}

	public void setNoteId(long noteId) {
		this.noteId = noteId;
	}


	@Column(name="CreateDate")
	public Timestamp getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}


	@Column(name="CreatedBy")
	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}


	@Column(name="EditDate")
	public Timestamp getEditDate() {
		return this.editDate;
	}

	public void setEditDate(Timestamp editDate) {
		this.editDate = editDate;
	}


	@Column(name="EditedBy")
	public String getEditedBy() {
		return this.editedBy;
	}

	public void setEditedBy(String editedBy) {
		this.editedBy = editedBy;
	}


	@Column(name="IncidentId")
	public long getIncidentId() {
		return this.incidentId;
	}

	public void setIncidentId(long incidentId) {
		this.incidentId = incidentId;
	}


	@Column(name="Note")
	public String getNote() {
		return this.note;
	}

	public void setNote(String note) {
		this.note = note;
	}

}